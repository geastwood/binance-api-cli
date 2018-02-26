/* @flow */

const chalk = require('chalk')
const exchange = require('../exchange')

const Trade: TCommandRunable = {
    async run({ symbol, orderId, format = 'summary' }) {
        // $FlowFixMe
        const data = await exchange.trades(symbol)

        if (orderId) {
            const order = data.findByOrderId(orderId)

            if (order) {
                console.log(chalk.blue.bold(symbol), order.renderer[format]())
            } else {
                console.log('No trade found for', symbol, 'with orderId', orderId)
            }
        } else {
            data.all().forEach(order => {
                console.log(chalk.blue.bold(symbol), order.renderer[format]())
            })
        }
    },
}

module.exports = Trade
