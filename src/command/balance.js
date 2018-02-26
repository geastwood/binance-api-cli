/* @flow */
const { log } = require('../util')
const exchange = require('../exchange')

type CommandOptions = {
    hideSmall?: boolean,
    smallThreshold?: number,
    symbol?: string,
}

const Balance: TCommandRunable = {
    async run({ hideSmall, smallThreshold, symbol }: CommandOptions) {
        const accountBalance = await exchange.balance()

        let data = accountBalance.getAllBalancesSummary(hideSmall, smallThreshold)

        if (symbol) {
            data = data.filter((_, asset) => asset === symbol)
        }

        data.map((v, asset) => log(`${asset}: ${v}`))
    },
}

module.exports = Balance
