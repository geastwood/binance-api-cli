/* @flow */

const minimist = require('minimist')
const clear = require('clear')
const commandWhiteList = ['symbol', 'balance', 'price', 'trade', 'help', 'version']
const { log, err } = require('./util')
const R = require('ramda')
const commands = require('./command')
const args = minimist(process.argv.slice(2))

clear()
log(args)

const command = R.head(args._)

// Checking top level commands
if (!commandWhiteList.includes(command)) {
    err(`only commands in list "[${commandWhiteList.join(', ')}]" are supported`)
    process.exit(1)
}

const run = async () => {
    // Pass down to individual commands
    await commands[command](R.omit(['_'], args))
    process.exit(0)
}

run()
