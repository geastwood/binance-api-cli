/* @flow */

const exchange = require('../exchange')
const ora = require('ora')
const clear = require('clear')
const { renderer } = require('../model/orderUpdate')
const { push } = require('../notification')
const { log } = require('../db')

const handler = (data: TOrderUpdateData) => {
    log('orderUpdate', data)
    push(renderer.notification(data), `Order update: ${data.executionType} - ${data.symbol}`)
}

const spinner = ora()
const liveUpdate: TCommandRunable = {
    async run() {
        spinner.start('Start to listen on order update')
        await exchange.userData(data => {
            clear()
            handler(data)
        })
    },
    help() {
        console.log('help of liveupdate')
    },
}

module.exports = liveUpdate
