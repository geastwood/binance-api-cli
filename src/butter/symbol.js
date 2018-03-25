/* @flow */
import * as exchange from '../exchange'
import { findBySymbolName } from '../model/symbol'

export const validateSymbol = async (symbol: string): Promise<TSymbolData | false> => {
    const symbols = await exchange.symbols()
    const symbolData = findBySymbolName(symbol, symbols)

    if (!symbolData) {
        return false
    }

    return symbolData
}
