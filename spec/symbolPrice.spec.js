const symbolPrice = require('../dist/model/symbolPrice')

describe('Simple price', () => {
    it('methods', () => {
        const data = {
            pair: 'ETHBTC',
            price: '0.001',
        }

        expect(symbolPrice.getPair(data)).toBe('ETHBTC')
        expect(symbolPrice.getPrice(data)).toBe(0.001)
    })
})
