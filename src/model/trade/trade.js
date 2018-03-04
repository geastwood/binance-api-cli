/* @flow */
const moment = require('moment')
const Renderer = require('./renderer')

class Trade {
    data: TTradeData
    renderer: Renderer
    static create: (data: TTradeData) => Trade

    constructor(data: TTradeData) {
        this.data = data
        this.renderer = new Renderer(this)
    }
    getId() {
        return this.data.id
    }
    getOrderId() {
        return this.data.orderId
    }
    getTime() {
        return moment(this.data.time).format()
    }
    getReadableTime() {
        return moment(this.data.time).fromNow()
    }
    getPrice() {
        return Number(this.data.price || 0)
    }
    getQty() {
        return Number(this.data.qty || 0)
    }
    isBuyer() {
        return this.data.isBuyer
    }
    isMaker() {
        return this.data.isMaker
    }
    getSide() {
        return this.isBuyer() ? 'Bought' : 'Sold'
    }
    serialize() {
        return this.data
    }
}

Trade.create = (data: TTradeData): Trade => new Trade(data)

module.exports = Trade
