/* @flow */
const exchange = require('../exchange')
const { summary } = require('../model/ticker/renderer')

type CommandOptions = {
    interval: '1m',
    symbol: string,
}

const renderHelp = () => {
    console.log('help for canclestick is coming soon')
}

const Candlestick: TCommandRunable = {
    async run({ interval, symbol }: CommandOptions) {
        const log = data => console.log(data)
        const ticker = await exchange.candlesticks('BCPTBTC', '1m', [log])
    },
    help() {
        renderHelp()
    },
}

module.exports = Candlestick
