const { normalize, schema } = require('normalizr')
const SymbolModel = require('./symbol')
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

exports.normalize = data => {
    const { entities } = normalize(data, symbolsSchema)

    return entities.symbols
}
