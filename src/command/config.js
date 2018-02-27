/* @flow */

const { warn, info, success } = require('../util')
const inquirer = require('inquirer')
const { getConfigstore } = require('../config')

const Config: TCommandRunable = {
    async run() {
        const config = getConfigstore()
        const { apiKey, secret } = await inquirer.prompt([
            {
                type: 'input',
                message: 'paste your apiKey here',
                name: 'apiKey',
            },
            {
                type: 'input',
                message: 'paste your secret here',
                name: 'secret',
            },
        ])

        if (!apiKey) {
            warn('apiKey is empty, you will only be able to access public data.')
        }

        if (!secret) {
            warn("secret is empty, you won't be able to trade.")
        }

        info(`writing apiKey and secret to ${config.path}`)
        config.set('apiKey', String(apiKey || '').trim())
        config.set('secret', String(secret || '').trim())
        success(`successfully store apiKey and secret to ${config.path}`)
    },
    help() {
        console.log('help of config')
    },
}

exports.getConfigstore = getConfigstore
module.exports = Config
