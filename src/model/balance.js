/* @flow */
import { toBalanceData } from './mapper'
import Table from 'easy-table'
import chalk from 'chalk'
import { formatPercentage } from '../util'

export const filterBalanceBySymbol = (symbol: string, balances: TBalanceData[]) =>
    balances.filter(balance => balance.symbol.includes(symbol))

export const getAllBalancesSummary = (
    hideSmall: boolean = false,
    threshold: number = 0.0001,
    balances: TBalanceData[],
) => {
    if (hideSmall) {
        return balances.filter(v => v.available > Number(threshold) || v.onOrder > Number(threshold))
    }

    return balances
}

export const createFromData = (data: {}): TBalanceData[] =>
    Object.keys(data).map(symbol => toBalanceData({ ...data[symbol], symbol }))

export const renderTable = (data: any[], quoteAsset: string, sumBalanceInQuote: number) => {
    const table = new Table()

    data.forEach(b => {
        const available = b.available * b.price
        const onOrder = b.onOrder * b.price
        table.cell(chalk.green('Symbol'), b.symbol)
        table.cell(chalk.green('Available'), b.available)
        table.cell(chalk.green('On Order'), b.onOrder)
        table.cell(chalk.green('Current Price'), b.price)
        table.cell(chalk.green(`in ${quoteAsset}`), available + onOrder)
        table.cell(chalk.green('Share'), formatPercentage((available + onOrder) / sumBalanceInQuote))
        table.newRow()
    })
    table.sort(['Share|des'])
    return table
}
