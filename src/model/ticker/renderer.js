/* @flow */

const {
    getSymbol,
    getPriceChangePercert,
    getVolume,
    getBidPrice,
    getAskPrice,
    getOpenPrice,
    getHighPrice,
    getLowPrice,
} = require('./ticker24')
const Table = require('cli-table2')
const { formatIndicativePercentage, formatInt } = require('../../util')

const summary = (data: TTicker24) => {
    const table = new Table()

    table.push({ Symbol: [getSymbol(data)] })
    table.push({ '24h Percent': [formatIndicativePercentage(getPriceChangePercert(data))] })
    table.push({ Volume: [formatInt(getVolume(data))] })
    table.push({ 'Bid Price': [getBidPrice(data)] })
    table.push({ 'Ask Price': [getAskPrice(data)] })
    table.push({ 'Open Price': [getOpenPrice(data)] })
    table.push({ 'High Price': [getHighPrice(data)] })
    table.push({ 'Low Price': [getLowPrice(data)] })
    return table.toString()
}

module.exports = { summary }
