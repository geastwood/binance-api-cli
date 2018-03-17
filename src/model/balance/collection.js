/* @flow */
import { toBalanceData } from '../mapper'

export const filterBalanceBySymbol = (symbol: string, balances: TBalanceData[]) =>
    balances.filter(balance => balance.symbol.includes(symbol))

export const getAllBalancesSummary = (
    hideSmall: boolean = false,
    threshold: number = 0.0001,
    balances: TBalanceData[],
) => {
    if (hideSmall) {
        return balances.filter(v => v.available > Number(threshold) || v.onOrder > Number(threshold))
    }

    return balances
}

export const createFromData = (data: {}): TBalanceData[] =>
    Object.keys(data).map(symbol => toBalanceData({ ...data[symbol], symbol }))
