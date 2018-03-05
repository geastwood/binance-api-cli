/* @flow */
const { getSide, getOrderId, getTime, getReadableTime, getPrice, getQty } = require('./trade')
const chalk = require('chalk')

const summary = (data: TTradeData): string =>
    `[${getOrderId(data)}]: ${getSide(data).toUpperCase()} with price ${getPrice(data)} for ${getQty(
        data,
    )} at ${getTime(data)} (${getReadableTime(data)})`
const short = (data: TTradeData): string =>
    `[${getOrderId(data)}-${getSide(data).toUpperCase()}]: ${chalk.yellow(getPrice(data))} x ${getQty(
        data,
    )} @ ${getReadableTime(data)}`

module.exports = {
    summary,
    short,
}
