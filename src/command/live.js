/* @flow */

const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const throttle = require('lodash.throttle')
const { tradeSocket, openOrders } = require('../exchange')
const { uniq } = require('ramda')
const Table = require('cli-table2')
const { formatIndicativePercentage } = require('../util')
const stripAnsi = require('strip-ansi')

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
        const t = new Table({
            head: ['Symbol', 'Side', 'Price', 'Qty', 'New price', 'Percentage'],
        })

        data.forEach(({ symbol, side, price, qty, newPrice, percentage }) =>
            t.push([symbol, side, price, qty, newPrice, formatIndicativePercentage(Number(percentage))]),
        )

        clear()
        console.log(t.toString())
    })

const line = (raw?: boolean) => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const { symbol, side, price, qty, newPrice, percentage } = data[count % data.length]
        clear()
        const output = `[${chalk.green(symbol)}-${side}] x ${qty} ${chalk.yellow(
            newPrice ? newPrice : 'no data yet',
        )}/${price} ${formatIndicativePercentage(Number(percentage))}`
        if (raw) {
            console.log(stripAnsi(output))
        } else {
            console.log(output)
        }
        count += 1
    })
}

type CommandOptions = { oneline?: boolean, raw?: boolean }

const spinner = ora()
const Price: TCommandRunable = {
    async run({ oneline, raw }: CommandOptions) {
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

module.exports = Price
