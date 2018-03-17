/* @flow */

import { prices } from '../exchange'
import { err, info } from '../util'
import chalk from 'chalk'
import { getSymbol, getPrice } from '../model/symbolPrice'
import cliui from 'cliui'

const ui = cliui()

const renderHelp = () => {
    ui.div('Usage: atcb price [options]')

    ui.div({
        text: 'Options:',
        padding: [1, 0, 1, 0],
    })

    ui.div(
        {
            text: '--symbol',
            width: 15,
            padding: [0, 2, 1, 2],
        },
        {
            text: `trading pair, e.g. ${chalk.green('VENBTC')}`,
            width: 40,
        },
        {
            text: chalk.red('[required]'),
            align: 'right',
        },
    )
    console.log(ui.toString())
}

const Price: TCommandRunable = {
    async run({ symbol }) {
        if (!symbol) {
            err('--symbol is required')
            process.exit(1)
        }

        try {
            const data = await prices(symbol)

            info(`${getSymbol(data)} is currently at ${getPrice(data)}`)
        } catch (e) {
            err(`Can't get price for ${symbol}`)
            process.exit(1)
        }
    },
    help() {
        renderHelp()
    },
}

module.exports = Price
