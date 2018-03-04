/* @flow */
const exchange = require('../exchange')

const getPriceForSymbols = (symbols: string[], quoteAsset: string) =>
    Promise.all(
        symbols.filter(symbol => symbol !== quoteAsset).map(async symbol => {
            try {
                return await exchange.prices(`${symbol}${quoteAsset}`)
            } catch (e) {
                return { symbol: 'INVALID', price: 0 }
            }
        }),
    )

module.exports = {
    getPriceForSymbols,
}
