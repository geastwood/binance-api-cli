/* @flow */

const getSymbol = (data: TSymbolPrice): string => data.symbol
const getPrice = (data: TSymbolPrice): number => Number(data.price)

module.exports = {
    getSymbol,
    getPrice,
}
