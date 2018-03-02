/* @flow */
const TradeModel = require('./trade')
const orderBy = require('lodash.orderby')

class Collection {
    data: TradeModel[]
    static create: (data: TTradeShape[]) => Collection
    static combineOrders: (orders: TradeModel[]) => TradeModel[]

    constructor(data: TTradeShape[]) {
        this.data = data.map(TradeModel.create)
    }

    findByOrderId(orderId: number) {
        return this.data.filter(model => model.getOrderId() === orderId)
    }

    all() {
        return this.data
    }

    orderBy(pred: (m: TradeModel) => Array<string | number>, direction: string[] = ['asc']) {
        return orderBy(this.data, pred, direction)
    }
}

Collection.create = (data: TTradeShape[]) => new Collection(data)

module.exports = Collection
