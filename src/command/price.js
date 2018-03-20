/* @flow */

import { prices } from '../exchange'
import { err, info } from '../util'
import { getSymbol, getPrice } from '../model/symbolPrice'
import { price as help } from './docs'

const Price: TCommandRunable = {
    async run({ pair }) {
        if (!pair) {
            err('--pair is required')
            process.exit(1)
        }

        try {
            const data = await prices(pair)

            info(`${getSymbol(data)} is currently at ${getPrice(data)}`)
        } catch (e) {
            err(`Can't get price for ${pair}`)
            process.exit(1)
        }
    },
    help() {
        console.log(help)
    },
}

module.exports = Price
