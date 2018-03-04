const symbolPrice = require('../dist/model/symbolPrice')

describe('Simple price', () => {
    it('methods', () => {
        const data = {
            symbol: 'ETHBTC',
            price: '0.001',
        }

        expect(symbolPrice.getSymbol(data)).toBe('ETHBTC')
        expect(symbolPrice.getPrice(data)).toBe(0.001)
    })
})
