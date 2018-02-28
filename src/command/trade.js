/* @flow */

const chalk = require('chalk')
const { err, info, formatPercentage } = require('../util')
const exchange = require('../exchange')
const tradeButter = require('../butter/trade')
const { getOrderId } = require('../userInput')

type CommandProps = {
    symbol: string,
    orderId: number,
    format: 'summary',
    estimateProfit: boolean,
}

const renderHelp = () => {
    console.log('help for trade is coming soon')
}

const tryEstimateProfit = async (symbol: string, orderId: number) => {
    const { price, meta } = await tradeButter.getOrdersWithPrice(symbol, orderId)
    const percent = (price.getPrice() - meta.averagePrice) / meta.averagePrice
    const indicator = p => `${(p > 0 ? chalk.green : chalk.red)(formatPercentage(p))} ${p > 0 ? '↑' : '↓'}`

    return `[${chalk.blue.bold(symbol)}-${orderId}] (x${meta.count}): Qty ${chalk.cyan(
        meta.qty,
    )} with price ${chalk.cyan(meta.averagePrice)} and now at 💹 ${chalk.cyan(price.getPrice())} ==> ${indicator(
        percent,
    )}`
}
const Trade: TCommandRunable = {
    async run({ symbol, orderId, format = 'summary', estimateProfit }: CommandProps) {
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
            process.exit(0)
        }
        // $FlowFixMe
        const data = await exchange.trades(symbol)
        if (orderId) {
            const orders = data.findByOrderId(orderId)
            if (orders.length > 0) {
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
