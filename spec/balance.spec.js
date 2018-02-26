const { balances, apiBalances } = require('./fixture')
const BalanceModel = require('../dist/model/balance/balance')
const Collection = require('../dist/model/balance/collection')

describe('model/balance', () => {
    it('model', () => {
        const model = BalanceModel.create(balances[0].asset, balances[0])

        expect(model.getId()).toBe('BTC')
        expect(model.getFree()).toBe(0.13925451)
        expect(typeof model.getFree()).toBe('number')
        expect(model.getLocked()).toBe(1)
        expect(typeof model.getLocked()).toBe('number')
    })

    it('collection', () => {
        const coll = Collection.create(apiBalances)

        expect(coll.filterBalanceBySymbol('LTC').toArray().length).toBe(1)
    })
})
