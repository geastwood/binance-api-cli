/* @flow */

const minimist = require('minimist')
const commandWhiteList: TCommandSupported = [
    'symbol',
    'balance',
    'price',
    'trade',
    'help',
    'version',
    'config',
    'ticker',
]
const { err } = require('./util')
const pkg = require('../package.json')
const R = require('ramda')
const commands = require('./command')
const { hasConfig, getConfigstore } = require('./config')
const args = minimist(process.argv.slice(2))
const binance = require('node-binance-api')
// $FlowFixMe
const command: TCommand = R.head(args._)

if (!hasConfig && command !== 'config') {
    err(`config file is not found, please run \`${pkg.name} config\` first to setup`)
    process.exit(1)
}

const config = getConfigstore()

binance.options({
    APIKEY: config.get('apiKey'),
    APISECRET: config.get('secret'),
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true, // If you want to use sandbox mode where orders are simulated
})

// log(args)

// Checking top level commands
if (!commandWhiteList.includes(command)) {
    err(`only commands in list "[${commandWhiteList.join(', ')}]" are supported`)
    process.exit(1)
}

const run = async () => {
    const passDownArgs = R.omit(['_'], args)

    if (passDownArgs.help) {
        commands[command].help()
        process.exit(0)
    }

    await commands[command].run(R.omit(['help'], passDownArgs))
    process.exit(0)
}

run()
