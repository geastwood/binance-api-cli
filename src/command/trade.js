/* @flow */

const { log } = require('../util')
const exchange = require('../exchange')

const Trade: TCommandRunable = {
    async run({ symbol }) {
        const data = await exchange.trades(symbol)

        log(data)
    },
}

module.exports = Trade
