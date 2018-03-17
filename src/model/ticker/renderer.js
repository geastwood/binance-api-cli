/* @flow */

import Table from 'cli-table2'
import { formatIndicativePercentage, formatInt } from '../../util'

export const summary = (data: TTicker24) => {
    const table = new Table()

    table.push({ Symbol: [data.symbol] })
    table.push({ '24h Percent': [formatIndicativePercentage(data.priceChangePercent / 100)] })
    table.push({ Volume: [formatInt(data.volume)] })
    table.push({ 'Bid Price': [data.bidPrice] })
    table.push({ 'Ask Price': [data.askPrice] })
    table.push({ 'Open Price': [data.openPrice] })
    table.push({ 'High Price': [data.highPrice] })
    table.push({ 'Low Price': [data.lowPrice] })
    return table.toString()
}
