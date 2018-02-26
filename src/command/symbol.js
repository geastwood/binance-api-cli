/* @flow */

const exchange = require('../exchange')
const { info } = require('../util')

const Symbol: TCommandRunable = {
    async run({ base }: { base: string }) {
        const symbolCollection = await exchange.symbols()

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
    },
}

module.exports = Symbol
