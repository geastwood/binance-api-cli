/* @flow */

const { run: symbol } = require('./symbol')
const { run: help } = require('./help')
const { run: balance } = require('./balance')
const { run: price } = require('./price')
const { run: trade } = require('./trade')

const commands: TCommandSupported = {
    symbol,
    help,
    version: help,
    balance,
    price,
    trade,
}

module.exports = commands
