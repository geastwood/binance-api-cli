const urls = require('../dist/api/url')

describe('api', () => {
    it('urls', () => {
        expect(urls.exchangeInfo()).toBe('https://api.binance.com/api/v1/exchangeInfo')
        expect(urls.account()).toBe('https://api.binance.com/api/v3/account')
    })

    it('works with urls', () => {
        expect(urls.exchangeInfo('foo=bar')).toBe('https://api.binance.com/api/v1/exchangeInfo?foo=bar')
    })
})
