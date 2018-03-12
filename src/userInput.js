/* @flow */
const exchange = require('./exchange')
const inquirer = require('inquirer')
const { getTime } = require('./model/trade/util')
const { short } = require('./model/trade/renderer')
const orderBy = require('lodash.orderby')

exports.getOrderId = async (symbol: string): Promise<number> => {
    const data = await exchange.trades(symbol)

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
