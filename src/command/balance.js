/* @flow */
const { log } = require('../util')
const exchange = require('../exchange')

type CommandOptions = {
    hideSmall?: boolean,
    smallThreshold?: number,
    symbol?: string,
}

const renderHelp = () => {
    console.log('help for balace is coming soon')
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
    help() {
        renderHelp()
    },
}

module.exports = Balance
