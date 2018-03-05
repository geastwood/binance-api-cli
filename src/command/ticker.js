/* @flow */
const exchange = require('../exchange')
const { summary } = require('../model/ticker/renderer')

type CommandOptions = {
    interval: '24h',
    symbol: string,
}

const renderHelp = () => {
    console.log('help for ticker is coming soon')
}

const Ticker: TCommandRunable = {
    async run({ interval, symbol }: CommandOptions) {
        const ticker = await exchange.ticker(interval, symbol)
        console.log(summary(ticker))
    },
    help() {
        renderHelp()
    },
}

module.exports = Ticker
