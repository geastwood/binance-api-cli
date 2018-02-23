const { normalize, schema } = require('normalizr')
const SymbolModel = require('../model/symbol')
const { Map } = require('immutable')
const R = require('ramda')
const { info } = require('../util')

const generateSymbolKey = ({ baseAsset, quoteAsset }) => `${baseAsset}/${quoteAsset}`

const symbolSchema = new schema.Entity(
    'symbols',
    {},
    {
        idAttribute: generateSymbolKey,
        processStrategy: value => SymbolModel.create(Object.assign({}, value, { id: generateSymbolKey(value) })),
    },
)
const symbolsSchema = [symbolSchema]

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
    const { entities } = normalize(symbols, symbolsSchema)

    return new SymbolCollection(entities.symbols)
}

module.exports = SymbolCollection
