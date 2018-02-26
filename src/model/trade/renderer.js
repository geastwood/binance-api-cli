/* @flow */
const TradeModel = require('./trade')
const chalk = require('chalk')

class Renderer {
    model: TradeModel
    constructor(model: TradeModel) {
        this.model = model
    }
    summary() {
        const side = this.model.isBuyer() ? 'Bought' : 'Sold'

        return `[${this.model.getOrderId()}]: ${side} with price ${this.model.getPrice()} for ${this.model.getQty()} at ${this.model.getTime()} (${this.model.getReadableTime()})`
    }
    short() {
        const side = this.model.isBuyer() ? 'Bought' : 'Sold'

        return `[${side}]: ${chalk.yellow(this.model.getPrice())}`
    }
}

module.exports = Renderer
