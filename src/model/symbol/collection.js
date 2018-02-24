const { normalize } = require('./schema')
const { Map } = require('immutable')
const { info } = require('../../util')

const SymbolCollection = class {
    constructor(data) {
        this.data = new Map(data)
    }

    getSupportedBaseAssets() {
        return this.data.map(sm => sm.getBaseAsset())
    }

    getSupportedBaseAssetsCount() {
        return this.data.count()
    }

    findByBaseAsset(value) {
        return this.data.filter(sm => sm.getBaseAsset() === value || sm.getQuoteAsset() === value)
    }

    printSummary() {
        info('Supported Assets counts:', this.getSupportedBaseAssetsCount())
    }
}

SymbolCollection.create = ({ symbols }) => {
    const entities = normalize(symbols)

    return new SymbolCollection(entities)
}

module.exports = SymbolCollection
