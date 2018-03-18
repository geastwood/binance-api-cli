/* @flow */
import moment from 'moment'
import chalk from 'chalk'
import Table from 'easy-table'

const toRenderableDataColl = (data: TOpenOrderData[]) =>
    data.map(({ orderId, symbol, side, price, origQty, time }) => ({
        orderId,
        symbol,
        side: side.toUpperCase(),
        price,
        origQty,
        time,
    }))

export const renderTable = (data: TOpenOrderData[]) => {
    const table = new Table()
    const coll = toRenderableDataColl(data)
    for (const order of coll) {
        table.cell(chalk.green('Order Id'), chalk.green(order.orderId))
        table.cell(chalk.green('Symbol'), order.symbol)
        table.cell(chalk.green('Side'), order.side)
        table.cell(chalk.green('Price'), order.price)
        table.cell(chalk.green('Qty'), order.origQty)
        table.cell(chalk.green('Relative time'), moment(order.time).toNow())
        table.cell(chalk.green('Time'), moment(order.time).format())
        table.newRow()
    }
    table.sort([`${chalk.green('Time')}|asc`])
    return table
}
