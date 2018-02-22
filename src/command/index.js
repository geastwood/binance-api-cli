const { run: symbol } = require('./symbol')
const { run: help } = require('./help')
const { run: balance } = require('./balance')

module.exports = {
    symbol,
    help,
    version: help,
    balance,
}
