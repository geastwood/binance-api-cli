/* @flow */

import { userData } from '../exchange'
import { err } from '../util'
import ora from 'ora'
import clear from 'clear'
import { renderer } from '../model/accountUpdate'
import { push } from '../notification'

const orderUpdateHander = (data: TOrderUpdateData) => {
    push(renderer.notificationOrderUpdate(data), `Order update: ${data.executionType} - ${data.symbol}`)
}
const balanceUpdateHandler = (data: TBalnaceUpdateData) => {
    push(renderer.notificationBalanceUpdate(data), 'Balance Update')
}

const spinner = ora()
const liveUpdate: TCommandRunable = {
    async run({ channel }: { channel: TLiveUpdateChannelName }) {
        if (!channel) {
            err('--channel must be specified, --channel=balance|execution')
            process.exit(1)
        }
        if (!['balance', 'execution'].includes(channel)) {
            err('--channel can either be "balance" or "execution"')
            process.exit(1)
        }
        spinner.start(`Start to listen on ${channel}`)
        await userData(channel, data => {
            clear()
            if (channel === 'balance') {
                balanceUpdateHandler(data)
            } else {
                orderUpdateHander(data)
            }
        })
    },
    help() {
        console.log('help of liveupdate')
    },
}

export default liveUpdate
