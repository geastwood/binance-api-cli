const SimplePrice = require('../dist/model/simplePrice')

describe('Simple price', () => {
    it('methods', () => {
        const price = new SimplePrice('ETHBTC', '0.0001')

        expect(price.getId()).toBe('ETHBTC')
        expect(price.getPrice()).toBe(0.0001)
    })
})
