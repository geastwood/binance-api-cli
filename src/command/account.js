const { log } = require('../util')
const api = require('../api')
const { withSignature } = require('../signer')
const AccountBalances = require('../model/accountBalance')

exports.run = async ({ hideSmall, threshold }) => {
    const signedPayload = withSignature({
        timestamp: Date.now(),
    })
    const rst = await api.account(signedPayload)

    const accountBalance = AccountBalances.create(rst)

    log(accountBalance.getAllBalancesSummary(hideSmall, threshold).map(([asset, v]) => `${asset}: ${v}`))
}
