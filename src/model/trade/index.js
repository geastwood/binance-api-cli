/* @flow */
const moment = require('moment')
const collection = require('./collection')
const renderer = require('./renderer')

const getTime = (trade: TTradeData) => moment(trade.time).format()
const getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
const getSide = (trade: TTradeData) => (trade.isBuyer ? 'Bought' : 'Sold')

module.exports = {}

module.exports = {
    collection,
    getTime,
    getReadableTime,
    getSide,
    renderer,
}
