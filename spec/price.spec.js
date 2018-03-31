const mappers = require('../dist/model/mapper')
const { symbols } = require('./fixture')
const { getFilteredPrice } = require('../dist/butter/price')

describe('description', () => {
    it('consider price filter', () => {
        const symbol = mappers.toSymbolData(symbols[0])
        const price1 = 0.001
        const price2 = 0.0555555555
        expect(getFilteredPrice(price1, symbol.priceFilter)).toBe(price1)
        expect(getFilteredPrice(price2, symbol.priceFilter)).toBe(0.05555555)
    })
})
