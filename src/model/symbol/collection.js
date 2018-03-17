/* @flow */
import { info } from '../../util'

export const getSupportedBaseAssets = (data: TSymbolData[]) => data.map(({ baseAsset }) => baseAsset)
export const getSupportedBaseAssetsCount = (data: TSymbolData[]) => data.length
export const findByBaseAsset = (name: string, data: TSymbolData[]) =>
    data.filter(d => d.baseAsset === name || d.quoteAsset === name)
export const printSummary = (data: TSymbolData[]) =>
    info('Supported Assets counts:', String(getSupportedBaseAssetsCount(data)))
