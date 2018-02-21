const { normalize, schema } = require('normalizr')
const { Map } = require('immutable')
const R = require('ramda')
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

const AccountBalances = class {
    constructor(accountMeta, balances) {
        this.accountMeta = accountMeta
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

AccountBalances.create = accountBalance => {
    const { entities } = normalize(accountBalance.balances, balancesSchema)
    const rest = R.omit(['balances'], accountBalance)

    return new AccountBalances(rest, entities.balances)
}

module.exports = AccountBalances
