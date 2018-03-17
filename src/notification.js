/* @flow */
import { getConfigstore } from './config'
import fetch from 'node-fetch'
import FormData from 'form-data'
import ora from 'ora'

const config = getConfigstore()
const pushOverApi = 'https://api.pushover.net'
const spinner = ora()

export const push = async (title: string, message: string) => {
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
