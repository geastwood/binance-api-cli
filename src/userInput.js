/* @flow */

import { trades } from './exchange'
import inquirer from 'inquirer'
import orderBy from 'lodash.orderby'
import { getTime, renderer } from './model/trade'
import { shortSummary } from './model/orderData'

export const getOrderId = async (symbol: string): Promise<number> => {
    const data = await trades(symbol)

    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to display',
        pageSize: 5,
        choices: orderBy(data, trade => [getTime(trade)], ['desc']).map((trade: TTradeData) => ({
            name: renderer.short(trade),
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

export const getPercentage = async (message: string = 'Percentage'): Promise<number> => {
    const { percentage } = await inquirer.prompt({
        type: 'list',
        name: 'percentage',
        message,
        pageSize: 4,
        choices: [25, 50, 75, 100].map(value => ({
            name: `${value}%`,
            value: value / 100,
        })),
    })

    return percentage
}
