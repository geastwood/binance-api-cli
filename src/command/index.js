/* @flow */

import balance from './balance'
import candlestick from './candlestick'
import config from './config'
import help from './help'
import price from './price'
import subscribe from './subscribe'
import symbol from './symbol'
import ticker from './ticker'
import trade from './trade'
import openOrder from './openOrder'
import buy from './buy'
import sell from './sell'

const commands = {
    balance,
    candlestick,
    config,
    help,
    price,
    subscribe,
    symbol,
    ticker,
    trade,
    version: help,
    openOrder,
    buy,
    sell,
}

export default commands
