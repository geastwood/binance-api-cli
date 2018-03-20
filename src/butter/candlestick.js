/* @flow */
import { candlestick } from '../exchange'
import { mean } from 'mathjs'

const aggTickers = (data: TCandlestickKlineData[]): TCandlestickKlineAggData => {
    const closes = data.reduce((acc, d) => acc.concat(d.close), [])
    return { close: mean(closes) }
}
export const getCandlesByIntervals = async (pair: string, intervals: TIntervalEnum[]) => {
    const data = await Promise.all(intervals.map(i => candlestick(pair, i)))
    return data.map(aggTickers)
}
