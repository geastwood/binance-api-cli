/* @flow */
import { log, info } from '../../util'

export const getName = ({ symbol }: TSymbolData) => symbol
export const getSymbol = ({ baseAsset, quoteAsset }: TSymbolData) => `${baseAsset}${quoteAsset}`
export const isBaseAsset = (symbol: string, { baseAsset }: TSymbolData) => symbol === baseAsset
export const getDescritpion = (data: TSymbolData) => `${getSymbol(data)} is ${data.status}`
export const print = (data: TSymbolData) => log(data)

export const getSupportedBaseAssets = (data: TSymbolData[]) => data.map(({ baseAsset }) => baseAsset)
export const getSupportedBaseAssetsCount = (data: TSymbolData[]) => data.length
export const findByBaseAsset = (name: string, data: TSymbolData[]) =>
    data.filter(d => d.baseAsset === name || d.quoteAsset === name)
export const printSummary = (data: TSymbolData[]) =>
    info('Supported Assets counts:', String(getSupportedBaseAssetsCount(data)))
