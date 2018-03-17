/* @flow */

import { warn, info, success } from '../util'
import inquirer from 'inquirer'
import { getConfigstore } from '../config'

const Config: TCommandRunable = {
    async run() {
        const config = getConfigstore()
        const { apiKey, secret, notificationApiToken, notificationUserKey, notificationDevice } = await inquirer.prompt(
            [
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
                {
                    type: 'input',
                    message: 'paste your api token for notification via pushover',
                    name: 'notificationApiToken',
                },
                {
                    type: 'input',
                    message: 'paste your user key for notification via pushover',
                    name: 'notificationUserKey',
                },
                {
                    type: 'input',
                    message: 'specify your device name for notification via pushover',
                    name: 'notificationDevice',
                },
            ],
        )

        if (!apiKey) {
            warn('apiKey is empty, you will only be able to access public data.')
        }

        if (!secret) {
            warn("secret is empty, you won't be able to trade.")
        }

        if (!notificationApiToken || !notificationUserKey || !notificationDevice) {
            warn("PushOver notification setup is not complete, you won't be able to receive notification.")
        }

        info(`writing apiKey and secret to ${config.path}`)
        config.set('apiKey', String(apiKey || config.apiKey).trim())
        config.set('secret', String(secret || config.secret).trim())
        config.set('notificationApiToken', String(notificationApiToken || config.notificationApiToken).trim())
        config.set('notificationUserKey', String(notificationUserKey || config.notificationUserKey).trim())
        config.set('notificationDevice', String(notificationDevice || config.notificationDevice).trim())
        success(`successfully store apiKey and secret to ${config.path}`)
    },
    help() {
        console.log('help of config')
    },
}

export default Config
