#!/usr/bin/env node
/* @flow */

import commands from './command'
import minimist from 'minimist'
import { err, warn } from './util'
import pkg from '../package.json'
import R from 'ramda'
import { hasConfig, getConfigstore } from './config'
import binance from 'node-binance-api'

const args = minimist(process.argv.slice(2))
// $FlowFixMe
const command: TCommand = R.head(args._)
const commandWhiteList: TCommandSupported = [
    'symbol',
    'balance',
    'price',
    'trade',
    'help',
    'version',
    'config',
    'ticker',
    'candlestick',
    'subscribe',
    'openOrder',
    'buy',
    'sell',
]

if (!hasConfig && command !== 'config') {
    err(`config file is not found, please run \`${pkg.name} config\` first to setup`)
    process.exit(1)
}

const config = getConfigstore()

try {
    binance.options({
        APIKEY: config.get('apiKey'),
        APISECRET: config.get('secret'),
        useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
        test: false, // If you want to use sandbox mode where orders are simulated
    })
} catch (e) {
    warn('binance api fail to initiate')
}

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
