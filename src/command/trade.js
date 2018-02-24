const api = require('../api')
const { log } = require('../util')
const { withSignature } = require('../signer')

module.exports.run = async ({ symbol }) => {
    const rst = await api.trade(withSignature({ symbol, timestamp: Date.now() }))

    log(rst)
}
