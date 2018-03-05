/* @flow */
const exchange = require('./exchange')
const { getTrades } = require('./db')
const inquirer = require('inquirer')
const { getOrderId, getTime } = require('./model/trade/trade')
const { short } = require('./model/trade/renderer')
const orderBy = require('lodash.orderby')
const { err } = require('./util')

exports.getOrderId = async (symbol: string): Promise<number> => {
    const data = await exchange.trades(symbol)

    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to display',
        pageSize: 5,
        choices: orderBy(data, trade => [getTime(trade)], ['desc']).map(trade => ({
            name: short(trade),
            value: getOrderId(trade),
        })),
    })

    return orderId
}

exports.getOrderFromDb = async (): Promise<number> => {
    const data = getTrades()
    if (!data.length) {
        err('No data in local db')
        process.exit(0)
    }
    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to unwatch',
        pageSize: 5,
        choices: orderBy(data, ({ time }) => [time], ['desc']).map(trade => ({
            name: `[${trade.symbol}]-${short(trade)}`,
            value: getOrderId(trade),
        })),
    })

    return orderId
}
