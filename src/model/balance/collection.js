const { Map } = require('immutable')
const { normalize } = require('./schema')

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

BalanceCollection.create = accountBalance => {
    const { balances } = normalize(accountBalance.balances)

    return new BalanceCollection(balances)
}

module.exports = BalanceCollection
