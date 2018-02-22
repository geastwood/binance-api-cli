const { normalize, schema } = require('normalizr')
const { Map } = require('immutable')
const BalanceModel = require('../model/balance')

const balanceSchema = new schema.Entity(
    'balances',
    {},
    {
        idAttribute: 'asset',
        processStrategy: value => BalanceModel.create(value),
    },
)

const balancesSchema = [balanceSchema]

const BalanceCollection = class {
    constructor(balances) {
        this.balances = new Map(balances)
    }

    getAllBalancesSummary(hideSmall, threshold = 0) {
        const data = this.balances.map((v, key) => [key, Number(v.getFree())])

        if (hideSmall) {
            return data.filter(([, v]) => v > Number(threshold))
        }

        return data
    }
}

BalanceCollection.create = accountBalance => {
    const { entities } = normalize(accountBalance.balances, balancesSchema)

    return new BalanceCollection(entities.balances)
}

module.exports = BalanceCollection
