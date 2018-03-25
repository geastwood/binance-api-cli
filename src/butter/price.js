/* @flow */
import { prices } from '../exchange'

export const getPriceForPairs = (pairs: string[]): Promise<Array<TSymbolPrice>> =>
    Promise.all(
        pairs.map(async pair => {
            try {
                return await prices(pair)
            } catch (e) {
                return { pair: 'INVALID', price: 0 }
            }
        }),
    )

export const getPriceByPairName = (data: TSymbolPrice[], pair: string) => {
    const rst = data.find(d => d.pair === pair)
    if (rst) {
        return rst.price
    }
    return 0
}
