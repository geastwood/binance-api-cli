/* @flow */
const { info } = require('../../util')

const getSupportedBaseAssets = (data: TSymbolData[]) => data.map(({ baseAsset }) => baseAsset)
const getSupportedBaseAssetsCount = (data: TSymbolData[]) => data.length
const findByBaseAsset = (name: string, data: TSymbolData[]) =>
    data.filter(d => d.baseAsset === name || d.quoteAsset === name)
const printSummary = (data: TSymbolData[]) =>
    info('Supported Assets counts:', String(getSupportedBaseAssetsCount(data)))

module.exports = {
    getSupportedBaseAssets,
    getSupportedBaseAssetsCount,
    findByBaseAsset,
    printSummary,
}
