const api = require('../api')
const { err, info } = require('../util')
const qs = require('query-string')

module.exports.run = async ({ symbol }) => {
    if (!symbol) {
        err('--symbol is required')
        process.exit(1)
    }

    const rst = await api.price(qs.stringify({ symbol }))

    if (rst.code) {
        err(rst.msg)
        process.exit(1)
    }

    info(`${rst.symbol} is currently at ${rst.price}`)
}
