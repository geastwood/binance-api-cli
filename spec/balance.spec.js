const { apiBalances } = require('./fixture')
const { createFromData, filterBalanceBySymbol } = require('../dist/model/balance')

describe('model/balance', () => {
    it('model', () => {
        const balances = createFromData(apiBalances)
        expect(balances[0].symbol).toBe('BTC')
        expect(balances[0].available).toBe(0.13925451)
        expect(typeof balances[0].available).toBe('number')
        expect(balances[0].onOrder).toBe(1)
        expect(typeof balances[0].onOrder).toBe('number')
    })

    it('collection', () => {
        const balances = createFromData(apiBalances)

        expect(filterBalanceBySymbol('LTC', balances).length).toBe(1)
    })
})
