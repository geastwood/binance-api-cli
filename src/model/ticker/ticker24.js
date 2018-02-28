/* @flow */
const moment = require('moment')
const Renderer = require('./renderer')

class Ticker24 {
    data: TTicker24
    renderer: Renderer
    static create: (data: TTicker24) => Ticker24

    constructor(data: TTicker24) {
        this.data = data
        this.renderer = new Renderer(this)
    }
    getSymbol() {
        return this.data.symbol
    }
    getPriceChangePercert() {
        return Number(this.data.priceChangePercent) / 100
    }
    getOpenTime() {
        return moment(this.data.openTime).format()
    }
    getCloseTime() {
        return moment(this.data.closeTime).format()
    }
    getBidPrice() {
        return Number(this.data.bidPrice)
    }
    getAskPrice() {
        return Number(this.data.askPrice)
    }
    getOpenPrice() {
        return Number(this.data.openPrice)
    }
    getHighPrice() {
        return Number(this.data.highPrice)
    }
    getLowPrice() {
        return Number(this.data.lowPrice)
    }
    getVolume() {
        return Number(this.data.volume)
    }
}

Ticker24.create = (data: TTicker24): Ticker24 => new Ticker24(data)

module.exports = Ticker24
