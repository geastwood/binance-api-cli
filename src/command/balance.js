/* @flow */
const { log, formatPercentage } = require('../util')
const { groupBy } = require('ramda')
const chalk = require('chalk')
const Table = require('cli-table2')
const exchange = require('../exchange')
const { getAllBalancesSummary } = require('../model/balance/collection')
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

    const table = new Table({
        head: ['Symbol', 'Available', 'On Order', `In ${quoteAsset}`, 'Share (%)'],
    })

    balanceWithPrice.forEach(b => {
        const available = b.available * b.price
        const onOrder = b.onOrder * b.price
        table.push([
            b.symbol,
            b.available,
            b.onOrder,
            available + onOrder,
            formatPercentage((available + onOrder) / sumBalanceInQuote),
        ])
    })

    console.log(table.toString())
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
