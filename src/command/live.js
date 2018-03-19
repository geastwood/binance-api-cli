/* @flow */

import Table from 'easy-table'
import chalk from 'chalk'
import clear from 'clear'
import ora from 'ora'
import stripAnsi from 'strip-ansi'
import throttle from 'lodash.throttle'
import { formatIndicativePercentage } from '../util'
import { openOrders, tradeSocket } from '../exchange'
import { uniq } from 'ramda'

const renderHelp = () => {
    console.log('help of live command will come soon')
}

type Comparison = {
    symbol: string,
    time: Date,
    price: number,
    qty: number,
    side: TOrderSideEnum,
    newPrice?: number,
    percentage?: number,
}

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

const line = (raw?: boolean) => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const { symbol, side, price, qty, newPrice, percentage } = data[count % data.length]
        clear()
        const output = `[${symbol}-${side}] x ${qty} ${chalk.green(
            newPrice ? newPrice : 'data yet to come',
        )}/${price} ${formatIndicativePercentage(Number(percentage))}`
        if (raw) {
            console.log(stripAnsi(output))
        } else {
            console.log(output)
        }
        count += 1
    })
}

const conciseRenderer = () => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const { symbol, side, percentage } = data[count % data.length]
        clear()
        const output = `[${symbol}-${side}] ${formatIndicativePercentage(Number(percentage))}`
        console.log(stripAnsi(output))
        count += 1
    })
}

type CommandOptions = { oneline?: boolean, raw?: boolean, concise?: boolean }

const spinner = ora()
const Price: TCommandRunable = {
    async run({ oneline, raw, concise }: CommandOptions) {
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
        const lineFn = line(raw)
        const tableFn = table()
        const conciseFn = conciseRenderer()
        const fns = [
            t => {
                data = data.map(d => {
                    if (d.symbol === t.s) {
                        return Object.assign({}, d, {
                            newPrice: Number(t.p),
                            percentage: (Number(t.p) - d.price) / d.price,
                        })
                    }
                    return d
                })
                if (oneline) {
                    lineFn(data)
                } else if (concise) {
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
    },
    help() {
        renderHelp()
    },
}

export default Price
