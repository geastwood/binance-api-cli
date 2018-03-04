/* @flow */
const { log } = require('../util')
const exchange = require('../exchange')
const { getAllBalancesSummary } = require('../model/balance/collection')
const { getSymbol, getFree } = require('../model/balance/balance')

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

        let data = getAllBalancesSummary(hideSmall, smallThreshold, accountBalance)

        if (symbol) {
            data = data.filter(balance => balance.symbol === symbol)
        }

        data.map(balance => log(`${getSymbol(balance)}: ${getFree(balance)}`))
    },
    help() {
        renderHelp()
    },
}

module.exports = Balance
