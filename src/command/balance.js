/* @flow */
import { log } from '../util'
import chalk from 'chalk'
import { renderTable } from '../model/balance'
import { getBalances, getTotalBalanceInQuoteAsset } from '../butter/balance'

type CommandOptions = {
    hideSmall?: boolean,
    smallThreshold?: number,
    symbol?: string,
    summary?: boolean,
    quoteAsset?: string,
}

const renderHelp = () => {
    console.log('help for balace is coming soon')
}

const Balance: TCommandRunable = {
    async run({ hideSmall = false, smallThreshold = 0.0001, quoteAsset = 'BTC', symbol, summary }: CommandOptions) {
        let balances = await getBalances(hideSmall, smallThreshold)
        if (summary) {
            const { balanceWithPrice, sum } = await getTotalBalanceInQuoteAsset(quoteAsset, balances)

            const table = renderTable(balanceWithPrice, quoteAsset, sum)
            console.log('\n', table.toString())
            console.log(`Total Balance in ${quoteAsset}: ${chalk.green.bold(sum)}`)
            process.exit(0)
        }

        if (symbol) {
            balances = balances.filter(balance => balance.symbol === symbol)
        }

        balances.map(balance => log(`${balance.symbol}: ${balance.available}/${balance.onOrder}`))
    },
    help() {
        renderHelp()
    },
}

module.exports = Balance
