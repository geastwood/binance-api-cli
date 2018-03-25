/* @flow */
import low from 'lowdb'
import chalk from 'chalk'
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import { dbPath, dbName, isDBConfigured } from '../config'
import { info } from '../util'
import fs from 'fs-extra'
import path from 'path'

if (!isDBConfigured) {
    info(`Initialized local json db at ${chalk.green.bold(path.join(dbPath, dbName))}`)
    fs.ensureDirSync(dbPath)
}

const adapter = new FileSync(path.join(dbPath, dbName))
const db = low(adapter)

db._.mixin(lodashId)

// Set some defaults (required if your JSON file is empty)
db.defaults({ triggers: [], logs: [] }).write()

export const log = (name: string, data: {}) =>
    db
        .get('logs')
        .insert({ name, data })
        .write()
