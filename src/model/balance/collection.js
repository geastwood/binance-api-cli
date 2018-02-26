const { Map } = require('immutable')
const BalanceModel = require('./balance')

const BalanceCollection = class {
    constructor(balances) {
        this.balances = new Map(balances)
    }

    getAllBalancesSummary(hideSmall, threshold = 0) {
        const data = this.balances.map(v => Number(v.getFree()))

        if (hideSmall) {
            return data.filter(v => v > Number(threshold))
        }

        return data
    }

    filterBalanceBySymbol(symbol) {
        return this.balances.filter((_, key) => key.includes(symbol))
    }
}

BalanceCollection.create = balances => {
    const modelCollection = Object.keys(balances).reduce(
        (carry, symbol) =>
            Object.assign(carry, {
                [symbol]: BalanceModel.create(symbol, balances[symbol]),
            }),
        {},
    )

    return new BalanceCollection(modelCollection)
}

module.exports = BalanceCollection
