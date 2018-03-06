/* @flow */

const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const throttle = require('lodash.throttle')
const { tradeSocket } = require('../exchange')
const { getTrades } = require('../db')
const { uniq } = require('ramda')
const Table = require('cli-table2')
const { formatIndicativePercentage } = require('../util')

const renderHelp = () => {
    console.log('help of live command will come soon')
}

type Comparison = {
    symbol: string,
    time: Date,
    originalPrice: number,
    originalQty: number,
    newPrice?: number,
    percentage?: number,
}

const throttleRender = (fn: (data: Comparison[]) => void, delay: number = 1000) =>
    throttle(fn, delay, { tail: true, leading: false })

const table = () =>
    throttleRender((data: Comparison[]) => {
        const t = new Table({
            head: ['Symbol', 'original price', 'original qty', 'new price', 'percentage'],
        })

        data.forEach(({ symbol, originalPrice, originalQty, newPrice, percentage }) =>
            t.push([symbol, originalPrice, originalQty, newPrice, formatIndicativePercentage(Number(percentage))]),
        )

        clear()
        console.log(t.toString())
    })

const line = () => {
    let count = 0
    return throttleRender((data: Comparison[]) => {
        const { symbol, originalPrice, originalQty, newPrice, percentage } = data[count % data.length]
        clear()
        const output = `${chalk.green.bold(symbol)} x ${originalQty} ${chalk.yellow(
            newPrice ? newPrice : 'no data yet',
        )}(${originalPrice}) ${formatIndicativePercentage(Number(percentage))}`
        console.log(output)
        count += 1
    })
}

type CommandOptions = { oneline?: boolean }

const spinner = ora()
const Price: TCommandRunable = {
    run({ oneline }: CommandOptions) {
        const trades = getTrades()
        const symbols = uniq(trades.map(({ symbol }) => symbol))
        let data = trades.map(t => ({
            symbol: t.symbol,
            time: t.time,
            originalPrice: Number(t.price),
            originalQty: Number(t.qty),
        }))
        clear()
        spinner.start('Socket being started...')
        const lineFn = line()
        const tableFn = table()
        const fns = [
            t => {
                data = data.map(d => {
                    if (d.symbol === t.s) {
                        return Object.assign({}, d, {
                            newPrice: Number(t.p),
                            percentage: (Number(t.p) - d.originalPrice) / d.originalPrice,
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
