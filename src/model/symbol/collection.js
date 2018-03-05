/* @flow */
const { info } = require('../../util')
const { getBaseAsset, getQuoteAsset } = require('./symbol')

const getSupportedBaseAssets = (data: TSymbolData[]) => data.map(getBaseAsset)
const getSupportedBaseAssetsCount = (data: TSymbolData[]) => data.length
const findByBaseAsset = (name: string, data: TSymbolData[]) =>
    data.filter(d => getBaseAsset(d) === name || getQuoteAsset(d) === name)
const printSummary = (data: TSymbolData[]) =>
    info('Supported Assets counts:', String(getSupportedBaseAssetsCount(data)))

module.exports = {
    getSupportedBaseAssets,
    getSupportedBaseAssetsCount,
    findByBaseAsset,
    printSummary,
}
