const collection = require('./collection')
const { log } = require('../../util')

const getName = ({ symbol }: TSymbolData) => symbol
const getSymbol = ({ baseAsset, quoteAsset }: TSymbolData) => `${baseAsset}${quoteAsset}`
const isBaseAsset = (symbol: string, { baseAsset }: TSymbolData) => symbol === baseAsset
const getDescritpion = (data: TSymbolData) => `${getSymbol(data)} is ${data.status}`
const print = (data: TSymbolData) => log(data)

module.exports = {
    collection,
    getName,
    getSymbol,
    isBaseAsset,
    getDescritpion,
    print,
}
