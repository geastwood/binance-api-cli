/* @flow */

import moment from 'moment'
import { trades as tradesApi, prices } from '../exchange'
import { findByOrderId } from '../model/trade'

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

export const getOrdersWithPrice = async (symbol: string, orderId: number): Promise<OrdersWithCurrentMarketPrice> => {
    const data = await tradesApi(symbol)
    const trades = findByOrderId(orderId, data)
    const price = await prices(symbol)
    const meta = getMetaForTrades(trades)

    return {
        meta,
        trades,
        price,
    }
}

export const getTime = (trade: TTradeData) => moment(trade.time).format()
export const getRelativeTime = (trade: TTradeData) => moment(trade.time).fromNow()
