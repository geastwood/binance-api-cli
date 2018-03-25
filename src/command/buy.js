/* @flow */
import { err, success } from '../util'
import { buy, prices } from '../exchange'
import { validateSymbol } from '../butter/symbol'
import { getBalanceBySymbol } from '../butter/balance'
import { getPercentage } from '../userInput'

const renderHelp = () => {
    console.log('help for buy is coming soon')
}

type CommandOptions = {
    symbol: string,
}

const Buy: TCommandRunable = {
    async run({ symbol }: CommandOptions) {
        if (!symbol) {
            err('--symbol is required for this command')
            process.exit(1)
        }
        const symbolData = await validateSymbol(symbol)
        if (!symbolData) {
            err(`${symbol} is not supported.`)
            process.exit(1)
            return
        }
        const balance = await getBalanceBySymbol(symbolData.quoteAsset)
        if (!balance) {
            err(`Quote asset ${symbolData.quoteAsset} is not found.`)
            process.exit(1)
            return
        }
        const percentage = await getPercentage(`How much of ${symbolData.quoteAsset} to allowcate to this order?`)
        const budget = balance.available * percentage

        const symbolPrice = await prices(symbol)
        const qty = Math.floor(budget / symbolPrice.price)
        try {
            await buy(symbol, qty, symbolPrice.price)
            success('Order successfully submitted')
        } catch (e) {
            err('Error occured')
        }
    },
    help() {
        renderHelp()
    },
}

module.exports = Buy
