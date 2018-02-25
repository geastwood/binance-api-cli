/* @flow */

const api = require('../api')
const { err, info } = require('../util')
const qs = require('query-string')
const SimplePrice = require('../model/simplePrice')

const Price: TCommandRunable = {
    async run({ symbol }) {
        if (!symbol) {
            err('--symbol is required')
            process.exit(1)
        }

        const rst = await api.price(qs.stringify({ symbol }))

        if (rst.code) {
            err(rst.msg)
            process.exit(1)
        }

        const model = SimplePrice.create(rst)

        info(`${model.getId()} is currently at ${model.getPrice()}`)
    },
}

module.exports = Price
