/* @flow */
const SimplePrice = require('./model/simplePrice')
const ora = require('ora')
const { path } = require('ramda')
const binanceApi = require('node-binance-api')
const { collection: SymbolCollection } = require('./model/symbol')
const { collection: BalanceCollection } = require('./model/balance')
const { collection: TradeCollection } = require('./model/trade')
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

type TSimplePriceShape = {
    [string]: number,
}

const spinner = ora()
exports.prices = async (symbol: string) => {
    spinner.start('Fetching price...')
    const data: TSimplePriceShape[] = await binance('prices', symbol)
    spinner.stop()

    // $FlowFixMe
    return new SimplePrice(symbol, path([symbol], data))
}

exports.trades = async (symbol: string) => {
    spinner.start('Loading historical trades...')
    const data = await binance('trades', symbol)
    spinner.stop()

    return TradeCollection.create(data)
}

exports.symbols = async () => {
    spinner.start('Loading exchange symbols...')
    const data = await binance('exchangeInfo')
    spinner.stop()

    return SymbolCollection.create(data)
}

exports.balance = async () => {
    spinner.start('Loading balances...')
    const data = await binance('balance')
    spinner.stop()

    return BalanceCollection.create(data)
}

exports.ticker = async (interval: string, symbol: string) => {
    spinner.start('Loading ticker price...')
    const data = await binance('prevDay', symbol)
    spinner.stop()
    return Ticker24.create(data)
}
