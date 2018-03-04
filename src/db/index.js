/* @flow */
const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db.json')
const db = low(adapter)

db._.mixin(lodashId)

// Set some defaults (required if your JSON file is empty)
db.defaults({ trades: [], triggers: [] }).write()

exports.addTrade = (trade: TTradeWithSymbolData) => {
    db
        .get('trades')
        .upsert(trade)
        .write()
}

exports.getTrades = (): TTradeWithSymbolData[] => db.get('trades').value()
