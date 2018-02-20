const api = require('../api')
const { log } = require('../util')
const SymbolCollection = require('../model/symbolCollection')

module.exports.run = async () => {
    const rst = await api.exchangeInfo()
    const symbolCollection = SymbolCollection.create(rst)

    log(symbolCollection.getSupportedBaseAssets())
}
