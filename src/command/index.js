/* @flow */

const symbol = require('./symbol')
const help = require('./help')
const balance = require('./balance')
const price = require('./price')
const trade = require('./trade')
const config = require('./config')

const commands = {
    symbol,
    help,
    version: help,
    balance,
    price,
    trade,
    config,
}

module.exports = commands
