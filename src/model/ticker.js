/* @flow */

import Table from 'easy-table'
import chalk from 'chalk'
import sparkly from 'sparkly'
import { scaleLinear } from 'd3-scale'
import { formatIndicativePercentage, formatInt } from '../util'

export const summary = (data: TTicker24) => {
    const table = new Table()

    table.cell(chalk.green('Symbol'), data.symbol)
    table.cell(chalk.green('24h Percent'), formatIndicativePercentage(data.priceChangePercent / 100))
    table.cell(chalk.green('Volume'), formatInt(data.volume))
    table.cell(chalk.green('Bid Price'), data.bidPrice)
    table.cell(chalk.green('Ask Price'), data.askPrice)
    table.cell(chalk.green('Open Price'), data.openPrice)
    table.cell(chalk.green('High Price'), data.highPrice)
    table.cell(chalk.green('Low Price'), data.lowPrice)
    table.newRow()

    return table
}

const intervalConfigMap = {
    '1m': { limit: 10, label: '10 min (1*10)', abbr: 'A' },
    '5m': { limit: 6, label: '30 mins (5*6)', abbr: 'B' },
    '15m': { limit: 4, label: '1 hour (15*4)', abbr: 'C' },
    '30m': { limit: 4, label: '2 hours (30*4)', abbr: 'D' },
    '1h': { limit: 4, label: '4 hours (1*4)', abbr: 'E' },
    '2h': { limit: 4, label: '8 hours (2*4)', abbr: 'F' },
    '4h': { limit: 3, label: '12 hours (4*3)', abbr: 'G' },
    '8h': { limit: 2, label: '16 hours (8*2)', abbr: 'H' },
    '12h': { limit: 3, label: '36 hours (12*3)', abbr: 'I' },
    '1d': { limit: 2, label: '2 days (1*2)', abbr: 'J' },
    '1w': { limit: 2, label: '2 weeks (1*2)', abbr: 'K' },
}

export const getTickerIntervalLimit = (interval: TIntervalEnum): number => intervalConfigMap[interval].limit
const getTickerIntervalLabel = (interval: TIntervalEnum): string =>
    `${intervalConfigMap[interval].label} - ${intervalConfigMap[interval].abbr}`
const getTickerIntervalAbbr = (interval: TIntervalEnum): string => intervalConfigMap[interval].abbr

export const tickerWithRegardIntervals = (
    pairs: string[],
    intervals: TIntervalEnum[],
    tickers: Array<Array<TCandlestickKlineAggData>>,
) => {
    const table = new Table()

    for (const [index, pair] of pairs.entries()) {
        const ticker = tickers[index]
        const allClosedPrices = ticker.map(({ close }) => close)
        const min = Math.min(...allClosedPrices)
        const max = Math.max(...allClosedPrices)
        const scaler = scaleLinear()
            .domain([min, max])
            .range([0, 1000])
        let prices = []
        table.cell(chalk.green('\nPair/Interval'), chalk.green(pair))
        for (const [intervalIndex, interval] of intervals.entries()) {
            const closedPrice = ticker[intervalIndex].close
            prices = prices.concat(closedPrice)
            table.cell(chalk.green(getTickerIntervalLabel(interval)), closedPrice.toFixed(8))
        }
        table.cell(chalk.green('Chart'), sparkly(prices.map(scaler), { style: 'fire' }))
        table.cell(chalk.yellow('Legend'), chalk.yellow(intervals.map(getTickerIntervalAbbr).join('')))
        table.newRow()
    }

    return table
}
