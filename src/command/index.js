/* @flow */

import balance from './balance'
import candlestick from './candlestick'
import config from './config'
import help from './help'
import live from './live'
import price from './price'
import subscribe from './subscribe'
import symbol from './symbol'
import ticker from './ticker'
import trade from './trade'

const commands = {
    balance,
    candlestick,
    config,
    help,
    live,
    price,
    subscribe,
    symbol,
    ticker,
    trade,
    version: help,
}

export default commands
