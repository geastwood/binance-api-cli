const fetch = require('isomorphic-fetch')
const api = require('../api')

module.exports.run = async () => {
    const rst = await api.exchangeInfo()

    console.log('rst: ', rst.symbols.map(({ symbol }) => symbol).join(', '))
}
