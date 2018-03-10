/* @flow */

const moment = require('moment')
const exchange = require('../exchange')
const { findByOrderId } = require('../model/trade/collection')

type OrderMeta = {
    count: number,
    averagePrice: number,
    qty: number,
}

const getMetaForTrades = (trades): OrderMeta => ({
    count: trades.length,
    averagePrice: trades.reduce((carry, order) => carry + order.price, 0) / trades.length,
    qty: trades.reduce((carry, order) => carry + order.qty, 0),
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

exports.getTime = (trade: TTradeData) => moment(trade.time).format()
exports.getRelativeTime = (trade: TTradeData) => moment(trade.time).fromNow()

exports.getOrdersWithPrice = getOrdersWithPrice
