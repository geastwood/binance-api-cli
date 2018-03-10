/* @flow */
const orderByLo = require('lodash.orderby')

const findByOrderId = (orderId: number, data: TTradeData[]) => data.filter(item => item.orderId === orderId)

const orderBy = (pred: (m: TTradeData) => Array<string | number>, direction: string[] = ['asc'], data: TTradeData[]) =>
    orderByLo(data, pred, direction)

module.exports = {
    findByOrderId,
    orderBy,
}
