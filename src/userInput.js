/* @flow */
const exchange = require('./exchange')
const inquirer = require('inquirer')

exports.getOrderId = async (symbol: string): Promise<number> => {
    const data = await exchange.trades(symbol)

    const { orderId } = await inquirer.prompt({
        type: 'list',
        name: 'orderId',
        message: 'Choose an order to display',
        pageSize: 5,
        choices: data.orderBy(model => [model.getId()], ['desc']).map(order => ({
            name: order.renderer.short(),
            value: order.getOrderId(),
        })),
    })

    return orderId
}
