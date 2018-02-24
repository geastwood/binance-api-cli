const fetch = require('isomorphic-fetch')
const urls = require('./url')
const config = require('../../config/config.json')

const toJson = a => a.json()
const exchangeInfo = () => fetch(urls.exchangeInfo()).then(toJson)
const account = (q, opts = {}) =>
    fetch(
        urls.account(q),
        Object.assign(opts, {
            headers: Object.assign(opts.headers || {}, {
                'X-MBX-APIKEY': config.apiKey,
            }),
        }),
    ).then(toJson)

const price = q => fetch(urls.price(q)).then(toJson)
const trade = (q, opts = {}) =>
    fetch(
        urls.trade(q),
        Object.assign(opts, {
            headers: Object.assign(opts.headers || {}, {
                'X-MBX-APIKEY': config.apiKey,
            }),
        }),
    ).then(toJson)

module.exports = {
    exchangeInfo,
    account,
    price,
    trade,
}
