/* @flow */

import chalk from 'chalk'
import { getSide, getTime, getReadableTime } from './util'

export const summary = (data: TTradeData): string =>
    `[${data.orderId}]: ${getSide(data).toUpperCase()} with price ${data.price} for ${data.qty} at ${getTime(
        data,
    )} (${getReadableTime(data)})`

export const short = (data: TTradeData): string =>
    `[${data.orderId}-${getSide(data).toUpperCase()}]: ${chalk.yellow(data.price)} x ${data.qty} @ ${getReadableTime(
        data,
    )}`
