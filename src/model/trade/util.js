/* @flow */
const moment = require('moment')
exports.getTime = (trade: TTradeData) => moment(trade.time).format()
exports.getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
exports.getSide = (trade: TTradeData) => (trade.isBuyer ? 'Bought' : 'Sold')
