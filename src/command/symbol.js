const api = require('../api')
const { info } = require('../util')
const { collection: SymbolCollection } = require('../model/symbol')

module.exports.run = async ({ base }) => {
    const rst = await api.exchangeInfo()
    const symbolCollection = SymbolCollection.create(rst)

    if (base) {
        const asset = symbolCollection.findByBaseAsset(base)

        if (asset.isEmpty()) {
            info(`no support for ${base}`)
        } else {
            info(`Found "${base}"`)
            asset.map((data, symbol) => info(`${symbol} (${data.isBaseAsset(base) ? 'base' : 'quote'})`))
        }
    } else {
        symbolCollection.printSummary()
    }
}
