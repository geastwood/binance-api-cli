/* @flow */
import { uniq } from 'ramda'
import { symbols, openOrders } from '../exchange'
import { info, err } from '../util'
import { findByBaseAsset, printSummary } from '../model/symbol/collection'
import { tickerWithRegardIntervals } from '../model/ticker/renderer'
import { isBaseAsset } from '../model/symbol'
import { symbol as help } from './docs'
import { getCandlesByIntervals } from '../butter/candlestick'

type CommandOptions = {
    base?: string,
    stat?: boolean,
    pair?: string | string[],
    openOrder?: boolean,
}

const intervals = [
    '1m',
    '3m',
    '5m',
    '15m',
    '30m',
    '1h',
    '2h',
    '4h',
    '6h',
    '8h',
    '12h',
    '1d',
    '3d',
    '1w',
    '1M',
].reverse()

const handleStat = async (pairs: string[]) => {
    const ticks = await Promise.all(pairs.map(pair => getCandlesByIntervals(pair, intervals)))
    const table = tickerWithRegardIntervals(pairs, intervals, ticks)
    console.log(table.printTransposed())
}

const Symbol: TCommandRunable = {
    async run({ base, stat, pair, openOrder }: CommandOptions) {
        if (stat) {
            if (pair || openOrder) {
                let openOrderPairs = []
                pair = pair || []
                if (openOrder) {
                    const orders = await openOrders()
                    openOrderPairs = uniq(orders.map(({ symbol }) => symbol))
                }

                await handleStat((Array.isArray(pair) ? pair : [pair]).concat(openOrderPairs))
                process.exit(1)
            }
            err('--stat flag needs a valid --pair argument or use --openOrder, e.g. --stat --pair=STORMBTC')
            process.exit(1)
        }
        const data = await symbols()

        if (base) {
            const asset = findByBaseAsset(base, data)

            if (asset.length) {
                info(`Found "${base}"`)
                asset.map(d => info(`${d.symbol} (${isBaseAsset(base, d) ? 'base' : 'quote'})`))
            } else {
                info(`no support for ${base}`)
            }
        } else {
            printSummary(data)
        }
    },
    help() {
        console.log(help)
    },
}

module.exports = Symbol
