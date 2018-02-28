/* @flow */

const pkg = require('../package.json')
const numeral = require('numeral')
const chalk = require('chalk')
const R = require('ramda')

const formatPercentage = (v: number) => numeral(v).format('0.000%')
const formatPrice = (v: number) => numeral(v).format('0.0000000000')
const formatIndicativePercentage = (p: number) =>
    `${(p > 0 ? chalk.green : chalk.red)(formatPercentage(p))} ${p > 0 ? '↑' : '↓'}`

module.exports.formatPercentage = formatPercentage
module.exports.formatPrice = formatPrice
module.exports.formatIndicativePercentage = formatIndicativePercentage

module.exports.log = (msg: string | {}) => {
    const format = chalk.yellow

    console.log(format(`[${pkg.name.toUpperCase()}/LOG]:`))
    if (R.is(Object, msg)) {
        console.log(format(JSON.stringify(msg, null, 4)))
    } else {
        console.log(format(msg))
    }
}

module.exports.err = (msg: string) => {
    console.log(chalk.red(`[${pkg.name.toUpperCase()}/ERROR]:`), msg)
}

module.exports.warn = (msg: string) => {
    console.log(chalk.yellow(`[${pkg.name.toUpperCase()}/WARN]:`), msg)
}

module.exports.success = (msg: string) => {
    console.log(chalk.green(`[${pkg.name.toUpperCase()}/WARN]:`), msg)
}

module.exports.info = (msg: string, ...rest: string[]) => {
    console.log(chalk.blue(`[${pkg.name.toUpperCase()}/INFO]:`), msg, ...rest)
}

module.exports.formatInt = (v: number) => numeral(v).format('0,0')
