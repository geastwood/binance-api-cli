/* @flow */
import { prices } from '../exchange'

export const getPriceForSymbols = (symbols: string[], quoteAsset: string) =>
    Promise.all(
        symbols.filter(symbol => symbol !== quoteAsset).map(async symbol => {
            try {
                return await prices(`${symbol}${quoteAsset}`)
            } catch (e) {
                return { symbol: 'INVALID', price: 0 }
            }
        }),
    )
