/* @flow */

import Table from 'easy-table'
import chalk from 'chalk'
import { formatIndicativePercentage, formatInt } from '../../util'

export const summary = (data: TTicker24) => {
    const table = new Table()

    table.cell(chalk.green('Symbol'), data.symbol)
    table.cell(chalk.green('24h Percent'), formatIndicativePercentage(data.priceChangePercent / 100))
    table.cell(chalk.green('Volume'), formatInt(data.volume))
    table.cell(chalk.green('Bid Price'), data.bidPrice)
    table.cell(chalk.green('Ask Price'), data.askPrice)
    table.cell(chalk.green('Open Price'), data.openPrice)
    table.cell(chalk.green('High Price'), data.highPrice)
    table.cell(chalk.green('Low Price'), data.lowPrice)
    table.newRow()

    return table
}
