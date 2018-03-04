/* @flow */

const ora = require('ora')
const clear = require('clear')
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
const print = (data: Comparison[]) => {
    const table = new Table({
        head: ['Symbol', 'original price', 'original qty', 'new price', 'percentage'],
    })

    data.forEach(({ symbol, originalPrice, originalQty, newPrice, percentage }) =>
        table.push([symbol, originalPrice, originalQty, newPrice, formatIndicativePercentage(Number(percentage))]),
    )
    console.log(table.toString())
}

const spinner = ora()
const Price: TCommandRunable = {
    run() {
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
        const fns = [
            () => clear(),
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
                print(data)
            },
        ]
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
