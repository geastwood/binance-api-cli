const { run: symbol } = require('./symbol')
const { run: help } = require('./help')
const { run: balance } = require('./balance')
const { run: price } = require('./price')

module.exports = {
    symbol,
    help,
    version: help,
    balance,
    price,
}
