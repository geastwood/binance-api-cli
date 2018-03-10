/* @flow */
const chalk = require('chalk')
const { getSide, getTime, getReadableTime } = require('./')

const summary = (data: TTradeData): string =>
    `[${data.orderId}]: ${getSide(data).toUpperCase()} with price ${data.price} for ${data.qty} at ${getTime(
        data,
    )} (${getReadableTime(data)})`

const short = (data: TTradeData): string =>
    `[${data.orderId}-${getSide(data).toUpperCase()}]: ${chalk.yellow(data.price)} x ${data.qty} @ ${getReadableTime(
        data,
    )}`

module.exports = {
    summary,
    short,
}
