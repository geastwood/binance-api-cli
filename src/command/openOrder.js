/* @flow */

import { openOrders, cancelOrder } from '../exchange'
import { askOpenOrderAction, askOpenOrderOrderIds, confirm } from '../userInput'
import { listAllOpenOrdersInTable } from '../butter/openOrder'
import { info } from '../util'
import groupBy from 'lodash.groupby'

const renderHelp = () => {
    console.log('help of openOrder command will come soon')
}

type CommandOptions = { interactive?: boolean }

export const handleOpenOrderInteractive = async (): Promise<*> => {
    const action = await askOpenOrderAction()

    if (action === 'list') {
        const rst = await listAllOpenOrdersInTable()
        console.log(rst)
    }

    if (action === 'cancel') {
        const allOpenOrders = await openOrders()
        const byOrderId = groupBy(allOpenOrders, 'orderId')
        const orderIds = await askOpenOrderOrderIds(allOpenOrders)
        if (orderIds.length > 0) {
            const message = `Sure to cancel orderIds ${orderIds.join(', ')}?`
            const y = await confirm(message)
            if (y) {
                for (const orderId of orderIds) {
                    await cancelOrder(orderId, byOrderId[orderId][0].symbol)
                }
            } else {
                info('Cancelled by user, no action is made.')
            }
            console.log(y)
        } else {
            info('No order Ids is selected, exiting')
        }
    }

    if (action === 'abort') {
        info('Interaction abort by user')
        process.exit(0)
    }

    await handleOpenOrderInteractive()
}

const Price: TCommandRunable = {
    async run({ interactive }: CommandOptions) {
        if (interactive) {
            await handleOpenOrderInteractive()
            process.exit(0)
        }
    },
    help() {
        renderHelp()
    },
}

export default Price
