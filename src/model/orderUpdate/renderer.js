/* @flow */
const moment = require('moment')

const renderer = {
    notification(model: TOrderUpdateData): string {
        let msg = `[${model.symbol}-${model.side}-${model.executionType}]: ${model.price} with qty ${
            model.qty
        } @ ${moment(model.transactionTime).format()} [#${model.orderId}-${model.orderType}]`

        if (model.executionType === 'REJECTED' && model.orderStatus === 'NEW') {
            msg = `!!!Order Rejected-${msg}-${model.rejectReason}`
        }
        return msg
    },
}

module.exports = renderer
