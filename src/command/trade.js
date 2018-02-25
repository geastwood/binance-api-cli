/* @flow */

const api = require('../api')
const { log } = require('../util')
const { withSignature } = require('../signer')

const Trade: TCommandRunable = {
    async run({ symbol }) {
        const rst = await api.trade(withSignature({ symbol, timestamp: Date.now() }))

        log(rst)
    },
}

module.exports = Trade
