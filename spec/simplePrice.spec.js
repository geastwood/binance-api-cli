const SimplePrice = require('../src/model/simplePrice')

describe('Simple price', () => {
    it('methods', () => {
        const price = SimplePrice.create({ symbol: 'ETHBTC', price: '0.0001' })

        expect(price.getId()).toBe('ETHBTC')
        expect(price.getPrice()).toBe(0.0001)
    })
})
