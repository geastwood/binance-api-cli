/* @flow */

exports.getPrice = (trade: TAggTradeData) => Number(trade.p)
exports.getQty = (trade: TAggTradeData) => Number(trade.q)
