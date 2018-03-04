/* @flow */
const ora = require('ora')
const binanceApi = require('node-binance-api')
const { collection: SymbolCollection } = require('./model/symbol')
const { createFromData } = require('./model/balance/collection')
const Ticker24 = require('./model/ticker/ticker24')
const binance = (fnName, ...rest): Promise<any> => {
    const method = binanceApi[fnName]

    return new Promise((resolve, reject) => {
        method(...rest, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const spinner = ora()
exports.prices = async (symbol: string): Promise<TSymbolPrice> => {
    spinner.start('Fetching price...')
    const data = await binance('prices', symbol)
    spinner.stop()

    return { symbol, price: data[symbol] }
}

exports.trades = async (symbol: string): Promise<Array<TTradeData>> => {
    spinner.start('Loading historical trades...')
    const data = await binance('trades', symbol)
    spinner.stop()

    return data
}

exports.symbols = async () => {
    spinner.start('Loading exchange symbols...')
    const data = await binance('exchangeInfo')
    spinner.stop()

    return SymbolCollection.create(data)
}

exports.balance = async (): Promise<Array<TBalanceData>> => {
    spinner.start('Loading balances...')
    const data = await binance('balance')
    spinner.stop()

    return createFromData(data)
}

exports.ticker = async (interval: string, symbol: string) => {
    spinner.start('Loading ticker price...')
    const data = await binance('prevDay', symbol)
    spinner.stop()
    return Ticker24.create(data)
}

type TradeSocketOptions = {
    onConnected?: () => void,
    filterFn?: (trade: any) => boolean,
}

exports.tradeSocket = (symbols: string[], subscribers: Function[], opts: TradeSocketOptions = {}): Promise<*> => {
    let initiated = false

    return new Promise(resolve => {
        const handler = (trade: TAggTradeData) => {
            let shouldRun = true
            if (initiated === false) {
                opts.onConnected && opts.onConnected()
                initiated = true
            }
            if (opts.filterFn) {
                shouldRun = opts.filterFn(trade)
            }
            for (const fn of subscribers) {
                shouldRun && fn(trade, resolve)
            }
        }
        binanceApi.websockets.trades(symbols, handler)
    })
}
