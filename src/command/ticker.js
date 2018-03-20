/* @flow */
import { ticker as tickerApi } from '../exchange'
import { summary } from '../model/ticker'

type CommandOptions = {
    interval: '24h',
    symbol: string,
}

const renderHelp = () => {
    console.log('help for ticker is coming soon')
}

const Ticker: TCommandRunable = {
    async run({ interval, symbol }: CommandOptions) {
        const ticker = await tickerApi(interval, symbol)
        console.log('\n', summary(ticker).toString())
    },
    help() {
        renderHelp()
    },
}

export default Ticker
