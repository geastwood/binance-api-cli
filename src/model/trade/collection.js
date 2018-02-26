/* @flow */
const TradeModel = require('./trade')

class Collection {
    data: TradeModel[]
    static create: (data: TTradeShape[]) => Collection

    constructor(data: TTradeShape[]) {
        this.data = data.map(TradeModel.create)
    }

    findByOrderId(orderId: number) {
        return this.data.find(model => model.getOrderId() === orderId)
    }
    all() {
        return this.data
    }
}

Collection.create = (data: TTradeShape[]) => new Collection(data)

module.exports = Collection
