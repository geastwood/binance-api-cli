/* @flow */

const chalk = require('chalk')
const { err, info, formatIndicativePercentage } = require('../util')
const exchange = require('../exchange')
const { addTrade } = require('../db')
const { push } = require('../notification')
const tradeButter = require('../butter/trade')
const { getOrderId } = require('../userInput')
const stripAnsi = require('strip-ansi')

type CommandProps = {
    symbol: string,
    orderId: number,
    format: 'summary',
    estimateProfit: boolean,
    notify: boolean,
    watch: boolean,
}

const renderHelp = () => {
    console.log('help for trade is coming soon')
}

const tryEstimateProfit = async (symbol: string, orderId: number) => {
    const { price, meta } = await tradeButter.getOrdersWithPrice(symbol, orderId)
    const percent = (price.getPrice() - meta.averagePrice) / meta.averagePrice

    return `[${chalk.blue.bold(symbol)}-${orderId}] (x${meta.count}): Qty ${chalk.cyan(
        meta.qty,
    )} with price ${chalk.cyan(meta.averagePrice)} and now at 💹 ${chalk.cyan(
        price.getPrice(),
    )} ==> ${formatIndicativePercentage(percent)}`
}
const Trade: TCommandRunable = {
    async run({ symbol, orderId, format = 'summary', estimateProfit, notify, watch }: CommandProps) {
        if (!symbol) {
            err('--symbol is required')
            process.exit(1)
        }
        if (orderId === true) {
            orderId = await getOrderId(symbol)
        }
        if (estimateProfit) {
            const rst = await tryEstimateProfit(symbol, orderId)
            info(rst)
            if (notify) {
                await push(stripAnsi(rst), symbol)
            }
            process.exit(0)
        }
        // $FlowFixMe
        const data = await exchange.trades(symbol)
        if (orderId) {
            const orders = data.findByOrderId(orderId)
            if (orders.length > 0) {
                if (watch) {
                    orders.forEach(order => addTrade(Object.assign(order.serialize(), { symbol })))
                    info('Successfully saved to watcher file.')
                }
                orders.forEach(order => {
                    console.log(chalk.blue.bold(symbol), order.renderer[format]())
                })
            } else {
                console.log('No trade found for', symbol, 'with orderId', orderId)
            }
        } else {
            data.all().forEach(order => {
                console.log(chalk.blue.bold(symbol), order.renderer[format]())
            })
        }
    },
    help() {
        renderHelp()
    },
}
module.exports = Trade
