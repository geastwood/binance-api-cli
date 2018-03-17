/* @flow */

export const getPrice = (trade: TAggTradeData) => Number(trade.p)
export const getQty = (trade: TAggTradeData) => Number(trade.q)
