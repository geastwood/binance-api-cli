/* @flow */

const exchange = require('../exchange')

const getMetaForOrders = orders => ({
    count: orders.length,
    orderId: orders[0].getOrderId(),
    averagePrice: orders.reduce((carry, order) => carry + order.getPrice(), 0) / orders.length,
    qty: orders.reduce((carry, order) => carry + order.getQty(), 0),
})

const getOrdersWithPrice = async (symbol: string, orderId: number) => {
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

exports.getOrdersWithPrice = getOrdersWithPrice
