/* @flow */

const moment = require('moment')
const exchange = require('../exchange')
const { findByOrderId } = require('../model/trade/collection')
const { getPrice, getQty } = require('../model/trade/trade')

type OrderMeta = {
    count: number,
    averagePrice: number,
    qty: number,
}

const getMetaForTrades = (trades): OrderMeta => ({
    count: trades.length,
    averagePrice: trades.reduce((carry, order) => carry + getPrice(order), 0) / trades.length,
    qty: trades.reduce((carry, order) => carry + getQty(order), 0),
})

type OrdersWithCurrentMarketPrice = {|
    meta: OrderMeta,
    trades: TTradeData[],
    price: TSymbolPrice,
|}

const getOrdersWithPrice = async (symbol: string, orderId: number): Promise<OrdersWithCurrentMarketPrice> => {
    const data = await exchange.trades(symbol)
    const trades = findByOrderId(orderId, data)
    const price = await exchange.prices(symbol)
    const meta = getMetaForTrades(trades)

    return {
        meta,
        trades,
        price,
    }
}

exports.getPrice = (trade: TTradeData) => Number(trade.price)
exports.getTime = (trade: TTradeData) => moment(trade.time).format()
exports.getRelativeTime = (trade: TTradeData) => moment(trade.time).fromNow()

exports.getOrdersWithPrice = getOrdersWithPrice
