const fetch = require('isomorphic-fetch')
const Table = require('cli-table')
const moment = require('moment')

const { formatPercentage } = require('./util')
const Binance = require('./exchange/binance')
const Bithumb = require('./exchange/bithumb')

const comparePair = async (exchanges, pair) => {
    return await Promise.all(
        exchanges.map(Exchange => {
            const ex = new Exchange()
            return ex.getPrice(pair)
        }),
    )
}

const compare = async (exchanges, pairs) => {
    const data = await Promise.all(
        pairs.map(async pair => {
            const [p1, p2] = await comparePair(exchanges, pair)
            return [p1, p2, formatPercentage(p1 / p2)]
        }),
    )
    return {
        prices: data,
        exchanges,
        pairs,
    }
}

compare([Binance, Bithumb], ['etc/btc', 'xrp/btc', 'btg/btc', 'dash/btc']).then(({ prices, exchanges, pairs }) => {
    const table = new Table({
        head: [''].concat(
            exchanges
                .map(e => {
                    return e.name
                })
                .concat('diff (%)'),
        ),
    })
    pairs.forEach((pair, i) => {
        const [coinName] = pair.split('/')
        table.push({ [coinName]: prices[i] })
    })

    console.log('====================================================\n')
    console.log(table.toString())
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
    console.log('\n====================================================')
})
