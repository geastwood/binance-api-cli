/* @flow */

import R from 'ramda'
import chalk from 'chalk'
import numeral from 'numeral'
import pkg from '../package.json'

export const formatPercentage = (v: number) => numeral(v).format('0.000%')
export const formatPrice = (v: number) => numeral(v).format('0.0000000000')
export const formatIndicativePercentage = (p: number) =>
    `${(p > 0 ? chalk.green : chalk.red)(formatPercentage(p))} ${p > 0 ? '↑' : '↓'}`

export const log = (msg: string | {}) => {
    const format = chalk.yellow

    console.log(format(`[${pkg.name.toUpperCase()}/LOG]:`))
    if (R.is(Object, msg)) {
        console.log(format(JSON.stringify(msg, null, 4)))
    } else {
        console.log(format(msg))
    }
}

export const err = (msg: string) => {
    console.log(chalk.red(`[${pkg.name.toUpperCase()}/ERROR]:`), msg)
}

export const warn = (msg: string) => {
    console.log(chalk.yellow(`[${pkg.name.toUpperCase()}/WARN]:`), msg)
}

export const success = (msg: string) => {
    console.log(chalk.green(`[${pkg.name.toUpperCase()}/WARN]:`), msg)
}

export const info = (msg: string, ...rest: string[]) => {
    console.log(chalk.blue(`[${pkg.name.toUpperCase()}/INFO]:`), msg, ...rest)
}

export const formatInt = (v: number) => numeral(v).format('0,0')
