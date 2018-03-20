/* @flow */

import Table from 'easy-table'
import chalk from 'chalk'
import sparkly from 'sparkly'
import { scaleLinear } from 'd3-scale'
import { formatIndicativePercentage, formatInt } from '../../util'

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
            table.cell(chalk.green(interval), closedPrice.toFixed(8))
        }
        table.cell(chalk.green('Chart'), sparkly(prices.map(scaler), { style: 'fire' }))
        table.newRow()
    }

    return table
}
