/* @flow */
const moment = require('moment')

export const getTime = (trade: TTradeData) => moment(trade.time).format()
export const getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
export const getSide = (trade: TTradeData) => (trade.isBuyer ? 'Bought' : 'Sold')
