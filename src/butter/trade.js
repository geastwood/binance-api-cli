/* @flow */

const moment = require('moment')
const exchange = require('../exchange')
const TradeModel = require('../model/trade/trade')
const SimplePrice = require('../model/simplePrice')

type OrderMeta = {
    count: number,
    averagePrice: number,
    qty: number,
}

const getMetaForOrders = (orders): OrderMeta => ({
    count: orders.length,
    averagePrice: orders.reduce((carry, order) => carry + order.getPrice(), 0) / orders.length,
    qty: orders.reduce((carry, order) => carry + order.getQty(), 0),
})

type OrdersWithCurrentMarketPrice = {|
    meta: OrderMeta,
    orders: TradeModel[],
    price: SimplePrice,
|}

const getOrdersWithPrice = async (symbol: string, orderId: number): Promise<OrdersWithCurrentMarketPrice> => {
    const data = await exchange.trades(symbol)
    const orders = data.findByOrderId(orderId)
    const price = await exchange.prices(symbol)
    const meta = getMetaForOrders(orders)

    return {
        meta,
        orders,
        price,
    }
}

exports.getPrice = (trade: TTradeData) => Number(trade.price)
exports.getTime = (trade: TTradeData) => moment(trade.time).format()
exports.getRelativeTime = (trade: TTradeData) => moment(trade.time).fromNow()

exports.getOrdersWithPrice = getOrdersWithPrice
