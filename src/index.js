const minimist = require('minimist')
const commandWhiteList = ['exchange', 'version', 'help']
const { log, err } = require('./util')
const R = require('ramda')
const commands = require('./command')
const args = minimist(process.argv.slice(2))

log(args)

const command = R.head(args._)

// Checking top level commands
if (!commandWhiteList.includes(command)) {
    err(`only commands in list "[${commandWhiteList.join(', ')}]" are supported`)
    process.exit(1)
}

// Pass down to individual commands
commands[command](R.omit(['_'], args))
