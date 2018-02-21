const { run: exchange } = require('./exchange')
const { run: help } = require('./help')
const { run: account } = require('./account')

module.exports = {
    exchange,
    help,
    version: help,
    account,
}
