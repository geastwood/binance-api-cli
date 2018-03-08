/* @flow */
const { toBalanceData } = require('../mapper')

const filterBalanceBySymbol = (symbol: string, balances: TBalanceData[]) =>
    balances.filter(balance => balance.symbol.includes(symbol))

const getAllBalancesSummary = (hideSmall: boolean = false, threshold: number = 0.0001, balances: TBalanceData[]) => {
    if (hideSmall) {
        return balances.filter(v => v.available > Number(threshold))
    }

    return balances
}

const createFromData = (data: {}): TBalanceData[] =>
    Object.keys(data).map(symbol => toBalanceData({ ...data[symbol], symbol }))

module.exports = {
    createFromData,
    filterBalanceBySymbol,
    getAllBalancesSummary,
}
