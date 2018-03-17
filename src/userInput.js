/* @flow */
import { trades } from './exchange'
import inquirer from 'inquirer'
import { getTime } from './model/trade/util'
import { short } from './model/trade/renderer'
import orderBy from 'lodash.orderby'

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
