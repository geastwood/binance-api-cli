const { balances } = require('../fixture')
const BalanceModel = require('../../src/model/balance/balance')

exports['model/balance'] = t => {
    const model = BalanceModel.create(balances[0])

    t.equal(model.getId(), 'BTC')
    t.equal(model.getFree(), 0.13925451)
    t.equal(typeof model.getFree(), 'number')
    t.equal(model.getLocked(), 1)
    t.equal(typeof model.getLocked(), 'number')
    t.done()
}
