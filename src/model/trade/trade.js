/* @flow */

const moment = require('moment')

const getId = (trade: TTradeData) => trade.id
const getOrderId = (trade: TTradeData) => trade.orderId
const getTime = (trade: TTradeData) => moment(trade.time).format()
const getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
const getPrice = (trade: TTradeData) => Number(trade.price || 0)
const getQty = (trade: TTradeData) => Number(trade.qty || 0)
const isBuyer = (trade: TTradeData) => trade.isBuyer
const isMaker = (trade: TTradeData) => trade.isMaker
const getSide = (trade: TTradeData) => (isBuyer(trade) ? 'Bought' : 'Sold')

module.exports = {
    getId,
    getOrderId,
    getTime,
    getReadableTime,
    getPrice,
    getQty,
    isBuyer,
    isMaker,
    getSide,
}
