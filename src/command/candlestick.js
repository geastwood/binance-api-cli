/* @flow */
import * as exchange from '../exchange'

type CommandOptions = {
    interval: '1m',
    symbol: string,
}

const renderHelp = () => {
    console.log('help for canclestick is coming soon')
}

const Candlestick: TCommandRunable = {
    async run({ interval = '1m' }: CommandOptions) {
        const log = data => console.log(data)
        await exchange.candlesticks('BCPTBTC', interval, [log])
    },
    help() {
        renderHelp()
    },
}

module.exports = Candlestick
