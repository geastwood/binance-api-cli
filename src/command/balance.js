const { log } = require('../util')
const api = require('../api')
const { withSignature } = require('../signer')
const { collection: BalanceCollection } = require('../model/balance')

exports.run = async ({ hideSmall, smallThreshold, symbol }) => {
    const signedPayload = withSignature({
        timestamp: Date.now(),
    })
    const rst = await api.account(signedPayload)
    const accountBalance = BalanceCollection.create(rst)

    let data = accountBalance.getAllBalancesSummary(hideSmall, smallThreshold)

    if (symbol) {
        data = data.filter((_, asset) => asset === symbol)
    }

    data.map((v, asset) => log(`${asset}: ${v}`))
}
