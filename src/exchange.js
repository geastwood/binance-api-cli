/* @flow */
const SimplePrice = require('./model/simplePrice')
const { head, path } = require('ramda')
const binanceApi = require('node-binance-api')
const { collection: SymbolCollection } = require('./model/symbol')
const { collection: BalanceCollection } = require('./model/balance')
const { collection: TradeCollection } = require('./model/trade')
const binance = (fnName, ...rest): Promise<any> => {
    const method = binanceApi[fnName]

    return new Promise((resolve, reject) => {
        method(...rest, (err, ...args) => {
            if (err) {
                reject(err)
            } else {
                resolve(args)
            }
        })
    })
}

type TSimplePriceShape = {
    [string]: number,
}

exports.prices = async (symbol: string) => {
    const data: TSimplePriceShape[] = await binance('prices', symbol)

    // $FlowFixMe
    return new SimplePrice(symbol, path([symbol], head(data)))
}

exports.trades = async (symbol: string) => {
    const data = await binance('trades', symbol)

    // $FlowFixMe
    return TradeCollection.create(head(data))
}

exports.symbols = async () => {
    const data = await binance('exchangeInfo')

    return SymbolCollection.create(head(data))
}

exports.balance = async () => {
    const data = await binance('balance')

    return BalanceCollection.create(head(data))
}
