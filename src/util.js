/* @flow */

const pkg = require('../package.json')
const numeral = require('numeral')
const chalk = require('chalk')
const R = require('ramda')

module.exports.formatPercentage = (v: number) => numeral(v).format('0.000%')
module.exports.formatPrice = (v: number) => numeral(v).format('0.0000000000')
module.exports.log = (msg: string) => {
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
