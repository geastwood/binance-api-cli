const numeral = require('numeral')

module.exports.formatPercentage = v => numeral(v).format('0.000%')
module.exports.formatPrice = v => numeral(v).format('0.0000000000')
