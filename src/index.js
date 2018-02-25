/* @flow */

const minimist = require('minimist')
const clear = require('clear')
const commandWhiteList: TCommandSupported = ['symbol', 'balance', 'price', 'trade', 'help', 'version', 'config']
const { log, err } = require('./util')
const pkg = require('../package.json')
const R = require('ramda')
const commands = require('./command')
const { hasConfig } = require('./config')
const args = minimist(process.argv.slice(2))
const command: TCommand = R.head(args._)

if (!hasConfig && command !== 'config') {
    err(`config file is not found, please run \`${pkg.name} config\` first to setup`)
    process.exit(1)
}

clear()
log(args)

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
