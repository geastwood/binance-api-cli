/* @flow */
const exchange = require('./exchange')
const inquirer = require('inquirer')
const { getId, getOrderId } = require('./model/trade/trade')
const { short } = require('./model/trade/renderer')
const { orderBy } = require('./model/trade/collection')

exports.getOrderId = async (symbol: string): Promise<number> => {
    const data = await exchange.trades(symbol)

    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to display',
        pageSize: 5,
        choices: orderBy(trade => [getId(trade)], ['desc'], data).map(trade => ({
            name: short(trade),
            value: getOrderId(trade),
        })),
    })

    return orderId
}
