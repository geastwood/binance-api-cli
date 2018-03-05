/* @flow */
const { log } = require('../../util')

const getName = ({ symbol }: TSymbolData) => symbol
const getSymbol = ({ baseAsset, quoteAsset }: TSymbolData) => `${baseAsset}${quoteAsset}`
const getBaseAsset = ({ baseAsset }: TSymbolData) => baseAsset
const getStatus = ({ status }: TSymbolData) => status
const getQuoteAsset = ({ quoteAsset }: TSymbolData) => quoteAsset
const isBaseAsset = (symbol: string, { baseAsset }: TSymbolData) => symbol === baseAsset
const getDescritpion = (data: TSymbolData) => `${getSymbol(data)} is ${getStatus(data)}`
const print = (data: TSymbolData) => log(data)

module.exports = {
    getName,
    getSymbol,
    getStatus,
    getBaseAsset,
    getQuoteAsset,
    isBaseAsset,
    getDescritpion,
    print,
}
