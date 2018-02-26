/* @flow */

const exchange = require('../exchange')
const { err, info } = require('../util')

const Price: TCommandRunable = {
    async run({ symbol }) {
        if (!symbol) {
            err('--symbol is required')
            process.exit(1)
        }

        try {
            const model = await exchange.prices(symbol)

            info(`${model.getId()} is currently at ${model.getPrice()}`)
        } catch (e) {
            err(`Can't get price for ${symbol}`)
            process.exit(1)
        }
    },
}

module.exports = Price
