/* @flow */
const ora = require('ora')
const { toCandlestickData } = require('./model/mapper')
const binanceApi = require('node-binance-api')
const { createFromData } = require('./model/balance/collection')
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

exports.symbols = async (): Promise<Array<TSymbolData>> => {
    spinner.start('Loading exchange symbols...')
    const data = await binance('exchangeInfo')
    spinner.stop()

    return data.symbols || []
}

exports.balance = async (): Promise<Array<TBalanceData>> => {
    spinner.start('Loading balances...')
    const data = await binance('balance')
    spinner.stop()

    return createFromData(data)
}

exports.ticker = async (interval: string, symbol: string): Promise<TTicker24> => {
    spinner.start('Loading ticker price...')
    const data = await binance('prevDay', symbol)
    spinner.stop()
    return data
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

exports.candlesticks = (symbol: string, interval: TIntervalEnum, subscribers: Function[]): Promise<*> =>
    new Promise(resolve => {
        const handler = (candlestick: any) => {
            const data = toCandlestickData(candlestick)
            for (const fn of subscribers) {
                fn(data, resolve)
            }
        }
        binanceApi.websockets.candlesticks(symbol, interval, handler)
    })
