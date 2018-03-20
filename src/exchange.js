/* @flow */
import ora from 'ora'
import { compose, identity } from 'ramda'
import * as mappers from './model/mapper'
import binanceApi from 'node-binance-api'
import { createFromData } from './model/balance'
import { getTickerIntervalLimit } from './model/ticker'

const binance = (fnName, ...rest): Promise<any> => {
    const method = binanceApi[fnName]

    return new Promise((resolve, reject) => {
        method(...rest, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const spinner = ora()
export const prices = async (symbol: string): Promise<TSymbolPrice> => {
    spinner.start('Fetching price...')
    const data = await binance('prices', symbol)
    spinner.stop()

    return { symbol, price: data[symbol] }
}

export const trades = async (symbol: string): Promise<Array<TTradeData>> => {
    spinner.start('Loading historical trades...')
    const data = await binance('trades', symbol)
    spinner.stop()

    return data.map(mappers.toTradeData)
}

export const symbols = async (): Promise<Array<TSymbolData>> => {
    spinner.start('Loading exchange symbols...')
    const data = await binance('exchangeInfo')
    spinner.stop()

    return data.symbols || []
}

export const balance = async (): Promise<Array<TBalanceData>> => {
    spinner.start('Loading balances...')
    const data = await binance('balance')
    spinner.stop()

    return createFromData(data)
}

export const ticker = async (interval: string, symbol: string): Promise<TTicker24> => {
    spinner.start('Loading ticker price...')
    const data = await binance('prevDay', symbol)
    spinner.stop()
    return mappers.toTicker24Data(data)
}

type TradeSocketOptions = {
    onConnected?: () => void,
    filterFn?: (trade: any) => boolean,
}

export const tradeSocket = (symbolXs: string[], subscribers: Function[], opts: TradeSocketOptions = {}): Promise<*> => {
    let initiated = false

    return new Promise(resolve => {
        const handler = (trade: TAggTradeData) => {
            let shouldRun = true
            if (initiated === false) {
                opts.onConnected && opts.onConnected()
                initiated = true
            }
            if (opts.filterFn) {
                shouldRun = opts.filterFn(trade)
            }
            for (const fn of subscribers) {
                shouldRun && fn(trade, resolve)
            }
        }
        binanceApi.websockets.trades(symbolXs, handler)
    })
}

export const candlesticks = (pair: string, interval: TIntervalEnum, subscribers: Function[]): Promise<*> =>
    new Promise(resolve => {
        const handler = (candlestick: any) => {
            const data = mappers.toCandlestickData(candlestick)
            for (const fn of subscribers) {
                fn(data, resolve)
            }
        }
        binanceApi.websockets.candlesticks(pair, interval, handler)
    })

export const candlestick = (pair: string, interval: TIntervalEnum): Promise<TCandlestickKlineData[]> =>
    new Promise(resolve => {
        const handler = (_: any, data: any[]) => {
            resolve(data.map(mappers.toCandlestickKlineData))
        }

        binanceApi.candlesticks(pair, interval, handler, { limit: getTickerIntervalLimit(interval) })
    })

export const userData = (type: TLiveUpdateChannelName, subscriber: Function): Promise<*> =>
    new Promise(() => {
        const handler = compose(
            subscriber,
            type === 'balance' ? mappers.toBalanceUpdateData : mappers.toOrderUpdateData,
        )
        if (type === 'balance') {
            binanceApi.websockets.userData(handler, identity)
        } else {
            binanceApi.websockets.userData(identity, handler)
        }
    })

export const openOrders = async (): Promise<Array<TOpenOrderData>> => {
    spinner.start('Fetching all open orders...')
    const data = await binance('openOrders', false)
    spinner.stop()

    return data.map(mappers.toOpenOrderData)
}

export const cancelOrder = async (orderId: number, symbol: string): Promise<*> => {
    spinner.start(`Cancelling order ${symbol} (${orderId})`)
    let data = null
    try {
        data = await binance('cancel', symbol, orderId)
    } catch (e) {
        spinner.fail(`Failed to order ${symbol} (${orderId})`)
    }
    spinner.stop()
    return data
}
