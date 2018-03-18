/* @flow */
import { log } from '../util'
import { groupBy } from 'ramda'
import chalk from 'chalk'
import * as exchange from '../exchange'
import { renderTable, getAllBalancesSummary } from '../model/balance'
import { getPriceForSymbols } from '../butter/price'

type CommandOptions = {
    hideSmall?: boolean,
    smallThreshold?: number,
    symbol?: string,
    summary?: boolean,
}

const renderHelp = () => {
    console.log('help for balace is coming soon')
}

const renderSummary = async (balances: TBalanceData[], quoteAsset: string = 'BTC') => {
    const prices = await getPriceForSymbols(balances.map(({ symbol }) => symbol), quoteAsset)
    const groupedPrices = groupBy(({ symbol }) => symbol, prices)

    // organize balance with current price
    const balanceWithPrice = []
    balances.forEach(b => {
        if (b.symbol === quoteAsset) {
            balanceWithPrice.push({
                ...b,
                price: 1,
            })
        } else if (groupedPrices[`${b.symbol}${quoteAsset}`]) {
            balanceWithPrice.push({
                ...b,
                price: Number(groupedPrices[`${b.symbol}${quoteAsset}`][0].price),
            })
        }
    })
    const sumBalanceInQuote = balanceWithPrice.reduce((total, b) => total + (b.available + b.onOrder) * b.price, 0)

    const table = renderTable(balanceWithPrice, quoteAsset, sumBalanceInQuote)
    console.log('\n', table.toString())
    console.log(`Total Balance in ${quoteAsset}: ${chalk.green.bold(sumBalanceInQuote)}`)
}

const Balance: TCommandRunable = {
    async run({ hideSmall, smallThreshold, symbol, summary }: CommandOptions) {
        const accountBalance = await exchange.balance()

        let data = getAllBalancesSummary(hideSmall, smallThreshold, accountBalance)

        if (summary) {
            await renderSummary(data)
            return
        }

        if (symbol) {
            data = data.filter(balance => balance.symbol === symbol)
        }

        data.map(balance => log(`${balance.symbol}: ${balance.available}/${balance.onOrder}`))
    },
    help() {
        renderHelp()
    },
}

module.exports = Balance
