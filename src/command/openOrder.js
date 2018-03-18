/* @flow */

import clear from 'clear'
import ora from 'ora'
import { openOrders } from '../exchange'
import { renderTable } from '../model/orderData'

const renderHelp = () => {
    console.log('help of openOrder command will come soon')
}

// type CommandOptions = { interactive?: boolean }

const spinner = ora()
const Price: TCommandRunable = {
    async run() {
        clear()
        spinner.start('Fetching all open orders')
        const allOpenOrders = await openOrders()
        const table = renderTable(allOpenOrders)
        console.log(table.toString())
    },
    help() {
        renderHelp()
    },
}

export default Price
