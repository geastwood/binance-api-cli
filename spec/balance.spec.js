const { apiBalances } = require('./fixture')
const { getSymbol, getFree, getLocked } = require('../dist/model/balance/balance')
const { createFromData, filterBalanceBySymbol } = require('../dist/model/balance/collection')

describe('model/balance', () => {
    it('model', () => {
        const balances = createFromData(apiBalances)
        expect(getSymbol(balances[0])).toBe('BTC')
        expect(getFree(balances[0])).toBe(0.13925451)
        expect(typeof getFree(balances[0])).toBe('number')
        expect(getLocked(balances[0])).toBe(1)
        expect(typeof getLocked(balances[0])).toBe('number')
    })

    it('collection', () => {
        const balances = createFromData(apiBalances)

        expect(filterBalanceBySymbol('LTC', balances).length).toBe(1)
    })
})
