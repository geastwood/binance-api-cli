/* @flow */
const SimplePrice = require('./model/simplePrice')
const { head } = require('ramda')
const binanceApi = require('node-binance-api')
const { collection: SymbolCollection } = require('./model/symbol')
const { collection: BalanceCollection } = require('./model/balance')
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

exports.prices = async (symbol: string) => {
    const data = await binance('prices', symbol)

    return new SimplePrice(symbol, head(data)[symbol])
}

exports.trades = async (symbol: string) => {
    const data = await binance('trades', symbol)

    return head(data)
}

exports.symbols = async () => {
    const data = await binance('exchangeInfo')

    return SymbolCollection.create(head(data))
}

exports.balance = async () => {
    const data = await binance('balance')

    return BalanceCollection.create(head(data))
}
