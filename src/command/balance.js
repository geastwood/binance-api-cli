/* @flow */
const { log } = require('../util')
const api = require('../api')
const { withSignature } = require('../signer')
const { collection: BalanceCollection } = require('../model/balance')

type CommandOptions = {
    hideSmall?: boolean,
    smallThreshold?: number,
    symbol?: string,
}

const Balance: TCommandRunable = {
    async run({ hideSmall, smallThreshold, symbol }: CommandOptions) {
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
    },
}

module.exports = Balance
