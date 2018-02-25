/* @flow */

const Configstore = require('configstore')
const pkg = require('../package.json')
const fs = require('fs')
const os = require('os')
const path = require('path')

const configPath = path.join(os.homedir(), '.config', pkg.name, 'config.json')
const hasConfig = fs.existsSync(configPath)
const getConfigstore = () => {
    let config = { apiKey: '', secret: '' }

    if (hasConfig) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    }

    return new Configstore(pkg.name, config, { globalConfigPath: true })
}

exports.getConfigstore = getConfigstore
exports.hasConfig = hasConfig
