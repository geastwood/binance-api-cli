/* @flow */

import chalk from 'chalk'
import orderByLodash from 'lodash.orderby'
import moment from 'moment'

export const getTime = (trade: TTradeData) => moment(trade.time).format()
export const getReadableTime = (trade: TTradeData) => moment(trade.time).fromNow()
export const getSide = (trade: TTradeData) => (trade.isBuyer ? 'Bought' : 'Sold')

export const findByOrderId = (orderId: number, data: TTradeData[]) => data.filter(item => item.id === orderId)
export const orderBy = (
    pred: (m: TTradeData) => Array<string | number>,
    direction: string[] = ['asc'],
    data: TTradeData[],
) => orderByLodash(data, pred, direction)

const summary = (data: TTradeData): string =>
    `[${data.orderId}]: ${getSide(data).toUpperCase()} with price ${data.price} for ${data.qty} at ${getTime(
        data,
    )} (${getReadableTime(data)})`

const short = (data: TTradeData): string =>
    `[${data.orderId}-${getSide(data).toUpperCase()}]: ${chalk.yellow(data.price)} x ${data.qty} @ ${getReadableTime(
        data,
    )}`

export const renderer = { summary, short }
