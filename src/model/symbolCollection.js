const { normalize, schema } = require('normalizr')
const SymbolModel = require('../model/symbol')
const { Map } = require('immutable')

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
}

SymbolCollection.create = ({ symbols }) => {
    const { entities } = normalize(symbols, symbolsSchema)

    return new SymbolCollection(entities.symbols)
}

module.exports = SymbolCollection
