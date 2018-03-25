/* @flow */
import moment from 'moment'
import { formatPercentage } from '../util'

export const notificationOrderUpdate = (model: TOrderUpdateData): string => {
    let { qty } = model

    if (model.side === 'SELL' && model.executionType === 'TRADE') {
        qty = `${qty} (${model.lastExecutedQty}/${model.cumulativeFilledQty}/${formatPercentage(
            model.lastExecutedQty / qty,
        )})`
    }

    let msg = `[${model.symbol}-${model.side}-${model.executionType}]: ${model.price} with qty ${qty} @ ${moment(
        model.transactionTime,
    ).format()} [#${model.orderId}-${model.orderType}]`

    if (model.executionType === 'REJECTED' && model.orderStatus === 'NEW') {
        msg = `!!!Order Rejected-${msg}-${model.rejectReason}`
    }

    if (model.side === 'SELL' && model.executionType === 'TRADE') {
        msg = `🎉👏 ${msg}`
    }
    if (model.side === 'SELL' && model.executionType === 'NEW') {
        msg = `🙏 ${msg}`
    }
    if (model.side === 'BUY' && model.executionType === 'NEW') {
        msg = `🛒 ${msg}`
    }
    return msg
}
export const notificationBalanceUpdate = (model: TBalnaceUpdateData): string =>
    `Account update receive @ ${moment(model.lastUpdatedAt).format()}`
