/* @flow */
const Ticker24Model = require('./ticker24')
const Table = require('cli-table2')
const { formatIndicativePercentage, formatInt } = require('../../util')

class Renderer {
    model: Ticker24Model
    constructor(model: Ticker24Model) {
        this.model = model
    }
    summary() {
        const table = new Table()
        const { model } = this

        table.push({ Symbol: [model.getSymbol()] })
        table.push({ Percent: [formatIndicativePercentage(model.getPriceChangePercert())] })
        table.push({ Volume: [formatInt(model.getVolume())] })
        table.push({ 'Bid Price': [model.getBidPrice()] })
        table.push({ 'Ask Price': [model.getAskPrice()] })
        table.push({ 'Open Price': [model.getOpenPrice()] })
        table.push({ 'High Price': [model.getHighPrice()] })
        table.push({ 'Low Price': [model.getLowPrice()] })
        return table.toString()
    }
}

module.exports = Renderer
