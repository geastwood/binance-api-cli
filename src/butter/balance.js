/* @flow */

import * as exchange from '../exchange'
import { groupBy } from 'ramda'
import { getAllBalancesSummary } from '../model/balance'
import { getPriceForPairs } from './price'

export const getBalances = async (hideSmall: boolean, smallThreshold: number) => {
    const accountBalance = await exchange.balance()
    return getAllBalancesSummary(hideSmall, smallThreshold, accountBalance)
}

export const getBalanceBySymbol = async (symbol: string): Promise<TBalanceData | false> => {
    const accountBalance = await exchange.balance()
    const rst = accountBalance.find(d => d.symbol === symbol)
    if (!rst) {
        return false
    }
    return rst
}

export const getTotalBalanceInQuoteAsset = async (quoteAsset: string = 'BTC', balances: TBalanceData[]) => {
    const prices = await getPriceForPairs(balances.map(({ symbol }) => `${symbol}${quoteAsset}`))
    const groupedPrices = groupBy(({ pair }) => pair, prices)

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
    const sum = balanceWithPrice.reduce(
        (total, b) => ({
            available: total.available + b.available * b.price,
            onOrder: total.onOrder + b.onOrder * b.price,
        }),
        { available: 0, onOrder: 0 },
    )

    return {
        balanceWithPrice,
        sum,
    }
}
