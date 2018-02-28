/* @flow */
const TradeModel = require('./trade')
const chalk = require('chalk')

class Renderer {
    model: TradeModel
    constructor(model: TradeModel) {
        this.model = model
    }
    summary() {
        return `[${this.model.getOrderId()}]: ${this.model
            .getSide()
            .toUpperCase()} with price ${this.model.getPrice()} for ${this.model.getQty()} at ${this.model.getTime()} (${this.model.getReadableTime()})`
    }
    short() {
        return `[${this.model.getOrderId()}-${this.model.getSide().toUpperCase()}]: ${chalk.yellow(
            this.model.getPrice(),
        )} @ ${this.model.getReadableTime()}`
    }
}

module.exports = Renderer
