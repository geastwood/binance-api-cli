const pkg = require('../package.json')
const numeral = require('numeral')
const chalk = require('chalk')
const R = require('ramda')

module.exports.formatPercentage = v => numeral(v).format('0.000%')
module.exports.formatPrice = v => numeral(v).format('0.0000000000')
module.exports.log = msg => {
    const format = chalk.yellow

    console.log(format(`[${pkg.name.toUpperCase()}/LOG]:`))
    if (R.is(Object, msg)) {
        console.log(format(JSON.stringify(msg, null, 4)))
    } else {
        console.log(format(msg))
    }
}

module.exports.err = msg => {
    console.log(chalk.red(`[${pkg.name.toUpperCase()}/ERROR]:`), msg)
}
