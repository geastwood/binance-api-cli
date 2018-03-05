/* @flow */
const low = require('lowdb')
const chalk = require('chalk')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')
const { dbPath, dbName, isDBConfigured } = require('../config')
const fs = require('fs-extra')
const path = require('path')
const { info } = require('../util')

if (!isDBConfigured) {
    info(`Initialized local json db at ${chalk.green.bold(path.join(dbPath, dbName))}`)
    fs.ensureDirSync(dbPath)
}

const adapter = new FileSync(path.join(dbPath, dbName))
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
