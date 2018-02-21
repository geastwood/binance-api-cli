const urls = require('../src/api/url')

exports['api/urls'] = t => {
    t.equal(urls.exchangeInfo(), 'https://api.binance.com/api/v1/exchangeInfo')
    t.equal(urls.account(), 'https://api.binance.com/api/v3/account')
    t.done()
}

exports['api/urls with query'] = t => {
    t.equal(urls.exchangeInfo('foo=bar'), 'https://api.binance.com/api/v1/exchangeInfo?foo=bar')
    t.done()
}
