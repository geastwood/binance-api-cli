/* @flow */

const moment = require('moment')

const getTime = (trade: TTradeData) => moment(trade.time).format()
const getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
const getSide = (trade: TTradeData) => (trade.isBuyer ? 'Bought' : 'Sold')

module.exports = {
    getTime,
    getReadableTime,
    getSide,
}
