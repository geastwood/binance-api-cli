/* @flow */

import { trades } from './exchange'
import inquirer from 'inquirer'
import orderBy from 'lodash.orderby'
import { getTime } from './model/trade/util'
import { short } from './model/trade/renderer'
import { shortSummary } from './model/orderData'

export const getOrderId = async (symbol: string): Promise<number> => {
    const data = await trades(symbol)

    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to display',
        pageSize: 5,
        choices: orderBy(data, trade => [getTime(trade)], ['desc']).map((trade: TTradeData) => ({
            name: short(trade),
            value: trade.id,
        })),
    })

    return orderId
}

export const askOpenOrderAction = async (): Promise<string> => {
    const { action } = await inquirer.prompt({
        type: 'expand',
        name: 'action',
        message: 'choose an action',
        choices: [
            { name: 'List', key: 'l', value: 'list' },
            { name: 'Cancel orders (support multitple)', key: 'c', value: 'cancel' },
            { name: 'Abort', key: 'a', value: 'abort' },
        ],
        default: 'list',
    })

    return action
}

export const askOpenOrderOrderIds = async (openOrders: TOpenOrderData[]): Promise<number[]> => {
    const choices = openOrders.map((order, i) => ({
        name: `${i + 1}. ${shortSummary(order)}`,
        value: order.orderId,
        short: order.orderId,
    }))
    const { orderId } = await inquirer.prompt({
        type: 'checkbox',
        name: 'orderId',
        message: 'Choose order Ids to cancel (support multiple)',
        choices,
        pageSize: 10,
        default: 'list',
    })
    return orderId
}

export const confirm = async (message: string): Promise<boolean> => {
    const { y } = await inquirer.prompt({
        type: 'confirm',
        name: 'y',
        message,
        default: 'Y',
    })

    return y
}
