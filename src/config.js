/* @flow */

const Configstore = require('configstore')
const pkg = require('../package.json')
const fs = require('fs')
const os = require('os')
const path = require('path')

const configPath = path.join(os.homedir(), '.config', pkg.name, 'config.json')
const dbPath = path.join(os.homedir(), `.${pkg.name}`)
const dbName = 'db.json'
const hasConfig = fs.existsSync(configPath)
const isDBConfigured = fs.existsSync(path.join(dbPath, dbName))

const getConfigstore = () => {
    let config = { apiKey: '', secret: '', notificationApiToken: '', notificationUserKey: '', notificationDevice: '' }

    if (hasConfig) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    }

    return new Configstore(pkg.name, config, { globalConfigPath: true })
}

exports.getConfigstore = getConfigstore
exports.hasConfig = hasConfig
exports.isDBConfigured = isDBConfigured
exports.dbPath = dbPath
exports.dbName = dbName
