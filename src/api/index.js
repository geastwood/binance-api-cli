const fetch = require('isomorphic-fetch')
const urls = require('./url')

const toJson = a => a.json()
const exchangeInfo = () => fetch(urls.exchangeInfo()).then(toJson)

module.exports = {
    exchangeInfo,
}
