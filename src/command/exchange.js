const api = require('../api')
const { info } = require('../util')
const SymbolCollection = require('../model/symbolCollection')

module.exports.run = async ({ base }) => {
    const rst = await api.exchangeInfo()
    const symbolCollection = SymbolCollection.create(rst)

    if (base) {
        const asset = symbolCollection.findByBaseAsset(base)

        if (asset) {
            info(`Found "${base}"`)
        }
    } else {
        symbolCollection.printSummary()
    }
}
