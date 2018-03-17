/* @flow */

import Configstore from 'configstore'
import pkg from '../package.json'
import fs from 'fs'
import os from 'os'
import path from 'path'

const configPath = path.join(os.homedir(), '.config', pkg.name, 'config.json')
export const dbPath = path.join(os.homedir(), `.${pkg.name}`)
export const dbName = 'db.json'
export const hasConfig = fs.existsSync(configPath)
export const isDBConfigured = fs.existsSync(path.join(dbPath, dbName))

export const getConfigstore = () => {
    let config = { apiKey: '', secret: '', notificationApiToken: '', notificationUserKey: '', notificationDevice: '' }

    if (hasConfig) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    }

    return new Configstore(pkg.name, config, { globalConfigPath: true })
}
