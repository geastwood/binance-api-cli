/* @flow */

const exchange = require('../exchange')
const { info } = require('../util')
const chalk = require('chalk')
const ui = require('cliui')()
const { findByBaseAsset, printSummary } = require('../model/symbol/collection')
const { isBaseAsset } = require('../model/symbol/symbol')

const renderHelp = () => {
    ui.div('Usage: atcb symbol [options]')

    ui.div({
        text: 'Options:',
        padding: [1, 0, 1, 0],
    })

    ui.div(
        {
            text: '--base',
            width: 15,
            padding: [0, 2, 1, 2],
        },
        {
            text: `symbol name, e.g. ${chalk.green('VEN')}`,
            width: 40,
        },
        {
            text: chalk.red('[required]'),
            align: 'right',
        },
    )

    ui.div({
        text: 'Examples:',
        padding: [1, 0, 1, 0],
    })

    ui.div({
        text: `${chalk.green('atcb symbol --base=VEN')}`,
        padding: [0, 0, 1, 2],
    })

    console.log(ui.toString())
}

const Symbol: TCommandRunable = {
    async run({ base }: { base: string }) {
        const data = await exchange.symbols()

        if (base) {
            const asset = findByBaseAsset(base, data)

            if (asset.length) {
                info(`Found "${base}"`)
                asset.map(d => info(`${d.symbol} (${isBaseAsset(base, d) ? 'base' : 'quote'})`))
            } else {
                info(`no support for ${base}`)
            }
        } else {
            printSummary(data)
        }
    },
    help() {
        renderHelp()
    },
}

module.exports = Symbol
