/* @flow */
const { getConfigstore } = require('./config')
const fetch = require('node-fetch')
const FormData = require('form-data')
const config = getConfigstore()
const pushOverApi = 'https://api.pushover.net'
const ora = require('ora')
const spinner = ora()

const push = async (title: string, message: string) => {
    const formData = new FormData()
    formData.append('token', config.get('notificationApiToken'))
    formData.append('user', config.get('notificationUserKey'))
    formData.append('device', config.get('notificationDevice'))
    formData.append('title', title)
    formData.append('message', message)

    spinner.start(`Sending notification to ${config.get('notificationDevice')}`)
    const { status } = await fetch(`${pushOverApi}/1/messages.json`, {
        method: 'POST',
        body: formData,
    }).then(data => data.json())
    if (status) {
        spinner.succeed()
    } else {
        spinner.fail()
    }
}

exports.push = push
