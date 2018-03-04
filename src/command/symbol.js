/* @flow */

const exchange = require('../exchange')
const { info } = require('../util')
const chalk = require('chalk')
const ui = require('cliui')()

const renderHelp = () => {
    ui.div('Usage: at4b symbol [options]')

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
        text: `${chalk.green('at4b symbol --base=VEN')}`,
        padding: [0, 0, 1, 2],
    })

    console.log(ui.toString())
}

const Symbol: TCommandRunable = {
    async run({ base }: { base: string }) {
        const symbolCollection = await exchange.symbols()

        if (base) {
            const asset = symbolCollection.findByBaseAsset(base)

            if (asset.isEmpty()) {
                info(`no support for ${base}`)
            } else {
                info(`Found "${base}"`)
                asset.map((data, symbol) => info(`${symbol} (${data.isBaseAsset(base) ? 'base' : 'quote'})`))
            }
        } else {
            symbolCollection.printSummary()
        }
    },
    help() {
        renderHelp()
    },
}

module.exports = Symbol
