/* @flow */
const { getFree } = require('./balance')

const filterBalanceBySymbol = (symbol: string, balances: TBalanceData[]) =>
    balances.filter(balance => balance.symbol.includes(symbol))
const getAllBalancesSummary = (hideSmall: boolean = false, threshold: number = 0, balances: TBalanceData[]) => {
    if (hideSmall) {
        return balances.filter(v => getFree(v) > Number(threshold))
    }

    return balances
}

const createFromData = (data: {}): TBalanceData[] =>
    Object.keys(data).map(symbol => Object.assign({}, data[symbol], { symbol }))

module.exports = {
    createFromData,
    filterBalanceBySymbol,
    getAllBalancesSummary,
}
