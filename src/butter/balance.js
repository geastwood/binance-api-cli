/* @flow */

import * as exchange from '../exchange'
import { groupBy } from 'ramda'
import { getAllBalancesSummary } from '../model/balance'
import { getPriceForSymbols } from './price'

export const getBalances = async (hideSmall: boolean, smallThreshold: number) => {
    const accountBalance = await exchange.balance()
    return getAllBalancesSummary(hideSmall, smallThreshold, accountBalance)
}

export const getTotalBalanceInQuoteAsset = async (quoteAsset: string = 'BTC', balances: TBalanceData[]) => {
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
    const sum = balanceWithPrice.reduce((total, b) => total + (b.available + b.onOrder) * b.price, 0)

    return {
        balanceWithPrice,
        sum,
    }
}
