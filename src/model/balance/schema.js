const { normalize, schema } = require('normalizr')
const BalanceModel = require('./balance')

const balanceSchema = new schema.Entity(
    'balances',
    {},
    {
        idAttribute: 'asset',
        processStrategy: value => BalanceModel.create(value),
    },
)

const balancesSchema = [balanceSchema]

exports.normalize = data => {
    const { entities } = normalize(data, balancesSchema)

    return entities
}
