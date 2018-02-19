const { run: exchange } = require('./exchange')
const { run: help } = require('./help')

module.exports = {
    exchange,
    help,
    version: help,
}
