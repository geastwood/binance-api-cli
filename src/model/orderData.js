/* @flow */
import moment from 'moment'
import chalk from 'chalk'
import Table from 'easy-table'
import { getPriceByPairName } from '../butter/price'
import { formatIndicativePercentage } from '../util'

const toRenderableDataColl = (data: TOpenOrderData[]) =>
    data.map(({ orderId, symbol, side, price, origQty, time }) => ({
        orderId,
        symbol,
        side: side.toUpperCase(),
        price,
        origQty,
        time,
    }))

export const renderTable = (data: TOpenOrderData[], prices: TSymbolPrice[]) => {
    const table = new Table()
    const coll = toRenderableDataColl(data)
    for (const order of coll) {
        const newPrice = getPriceByPairName(prices, order.symbol)
        table.cell(chalk.green('Order Id'), chalk.green(order.orderId))
        table.cell(chalk.green('Symbol'), order.symbol)
        table.cell(chalk.green('Side'), order.side)
        table.cell(chalk.green('Price'), order.price)
        table.cell(chalk.green('Qty'), order.origQty)
        table.cell(chalk.green('New Price'), newPrice)
        table.cell(chalk.green('Difference'), formatIndicativePercentage((newPrice - order.price) / order.price))
        table.cell(chalk.green('Relative time'), moment(order.time).fromNow())
        table.cell(chalk.green('Time'), moment(order.time).format())
        table.newRow()
    }
    table.sort([`${chalk.green('Time')}|asc`])
    return table
}

export const shortSummary = (data: TOpenOrderData) =>
    `[${data.orderId}-${data.symbol}-${data.side.toUpperCase()}] ${data.price} with ${data.origQty} @ ${moment(
        data.time,
    ).format()}`

export const getExpectation = (data: TOpenOrderData[]) =>
    data.reduce((sum, order) => sum + order.price * order.origQty, 0)
