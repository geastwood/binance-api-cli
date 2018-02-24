const { balances, account } = require('./fixture')
const BalanceModel = require('../src/model/balance/balance')
const Schema = require('../src/model/balance/schema')
const Collection = require('../src/model/balance/collection')

describe('model/balance', () => {
    it('model', () => {
        const model = BalanceModel.create(balances[0])

        expect(model.getId()).toBe('BTC')
        expect(model.getFree()).toBe(0.13925451)
        expect(typeof model.getFree()).toBe('number')
        expect(model.getLocked()).toBe(1)
        expect(typeof model.getLocked()).toBe('number')
    })

    it('schema', () => {
        const rst = Schema.normalize(account.balances)

        expect(Object.keys(rst.balances).every(symbol => rst.balances[symbol] instanceof BalanceModel)).toBe(true)
    })

    it('collection', () => {
        const coll = Collection.create(account)

        expect(coll.filterBalanceBySymbol('BAT').toArray().length).toBe(1)
    })
})
