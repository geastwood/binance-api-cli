/* @flow */

import { askOpenOrderAction, askOpenOrderOrderIds, confirm } from '../userInput'
import { listAllOpenOrdersInTable } from '../butter/openOrder'
import groupBy from 'lodash.groupby'
import throttle from 'lodash.throttle'
import Table from 'easy-table'
import chalk from 'chalk'
import clear from 'clear'
import ora from 'ora'
import { formatIndicativePercentage, info } from '../util'
import { openOrders, cancelOrder, tradeSocket } from '../exchange'
import { uniq } from 'ramda'

const renderHelp = () => {
    console.log('help of openOrder command will come soon')
}

type ModeEnum = 'oneline' | 'concise' | 'table'
type CommandOptions = { interactive?: boolean, live?: boolean, mode?: ModeEnum }
type Comparison = {
    symbol: string,
    time: Date,
    price: number,
    qty: number,
    side: TOrderSideEnum,
    newPrice?: number,
    percentage?: number,
}

const spinner = ora()
const throttleRender = (fn: (data: Comparison[]) => void, delay: number = 3000) =>
    throttle(fn, delay, { tail: true, leading: false })

const table = () =>
    throttleRender((data: Comparison[]) => {
        const t = new Table()

        data.forEach(({ symbol, side, price, qty, newPrice, percentage }) => {
            t.cell(chalk.green('Symbol'), symbol)
            t.cell(chalk.green('Side'), side)
            t.cell(chalk.green('Qty'), qty)
            t.cell(chalk.green('Price'), chalk.yellow(price))
            t.cell(chalk.green('New Price'), newPrice ? chalk.green(newPrice) : 'data yet to come')
            t.cell(chalk.green('Percentage'), formatIndicativePercentage(Number(percentage)))
            t.newRow()
        })

        clear()
        console.log(t.toString())
    })

const line = () => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const { symbol, side, price, qty, newPrice, percentage } = data[count % data.length]
        clear()
        const output = `[${symbol}-${side}] x ${qty} ${chalk.green(
            newPrice ? newPrice : 'data yet to come',
        )}/${price} ${formatIndicativePercentage(Number(percentage))}`
        console.log(output)
        count += 1
    })
}

const conciseRenderer = () => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const index = count % data.length
        const { symbol, percentage } = data[index]
        const v = percentage === undefined ? '-.--' : (Number(percentage) * 100).toFixed(2)
        console.log(`${index + 1}. ${symbol} ${v}%`)
        count += 1
    })
}

export const handleOpenOrderInteractive = async (): Promise<*> => {
    const action = await askOpenOrderAction()

    if (action === 'list') {
        const rst = await listAllOpenOrdersInTable()
        console.log(rst)
    }

    if (action === 'cancel') {
        const allOpenOrders = await openOrders()
        const byOrderId = groupBy(allOpenOrders, 'orderId')
        const orderIds = await askOpenOrderOrderIds(allOpenOrders)
        if (orderIds.length > 0) {
            const message = `Sure to cancel orderIds ${orderIds.join(', ')}?`
            const y = await confirm(message)
            if (y) {
                for (const orderId of orderIds) {
                    await cancelOrder(orderId, byOrderId[orderId][0].symbol)
                }
            } else {
                info('Cancelled by user, no action is made.')
            }
        } else {
            info('No order Ids is selected, exiting')
        }
    }

    if (action === 'abort') {
        info('Interaction abort by user')
        process.exit(0)
    }

    await handleOpenOrderInteractive()
}

export const handleLiveOrder = async (mode?: ModeEnum): Promise<*> => {
    const allOpenOrders = await openOrders()
    const symbols = uniq(allOpenOrders.map(({ symbol }) => symbol))
    let data = allOpenOrders.map(order => ({
        symbol: order.symbol,
        time: order.time,
        side: order.side,
        price: order.price,
        qty: order.origQty,
    }))
    clear()
    spinner.start('Socket being started...')
    const lineFn = line()
    const tableFn = table()
    const conciseFn = conciseRenderer()
    const fns = [
        t => {
            data = data.map(d => {
                if (d.symbol === t.s) {
                    return {
                        ...d,
                        newPrice: Number(t.p),
                        percentage: (Number(t.p) - d.price) / d.price,
                    }
                }
                return d
            })
            if (mode === 'oneline') {
                lineFn(data)
            } else if (mode === 'concise') {
                conciseFn(data)
            } else {
                tableFn(data)
            }
        },
    ]

    if (!symbols.length) {
        spinner.fail('At least one symbol must be specified, exiting.')
        process.exit(1)
    }

    return tradeSocket(symbols, fns, {
        filterFn: ({ m }) => Boolean(m),
        onConnected: () => spinner.stop(),
    })
}

const Price: TCommandRunable = {
    async run({ interactive, live, mode }: CommandOptions) {
        if (interactive) {
            await handleOpenOrderInteractive()
            process.exit(0)
        }
        if (live) {
            await handleLiveOrder(mode)
            process.exit(0)
        } else {
            const rst = await listAllOpenOrdersInTable()
            console.log(rst)
        }
    },
    help() {
        renderHelp()
    },
}

export default Price
