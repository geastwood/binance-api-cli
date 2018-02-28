/* @flow */
const exchange = require('../exchange')

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
        console.log(ticker.renderer.summary())
    },
    help() {
        renderHelp()
    },
}

module.exports = Ticker
