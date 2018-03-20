/* @flow */
import chalk from 'chalk'

const renderHeader = text => chalk.green.bold(text)

export const symbol = `
    ${renderHeader('Usage')}: 
        atcb symbol [options]

    ${renderHeader('Options')}: 
        --base      [optional]      symbol name, E.g. ${chalk.green('VEN')}
        --stat      [optional]      show status of provided trading pairs,
                                    this flag must be used in conjunction with
                                    --pair or --openOrder
        --openOrder [optional]      append pairs from open orders to pair list
        --pair      [optional]      specify trading pair
        --help      [optional]      bring up this section

    ${renderHeader('Examples')}: 
        * atcb symbol --base=VEN
        * atcb symbol --stat --pair=STORMBTC --pair=VENBTC
        * atcb symbol --stat --pair=STORMBTC --openOrder
    `

export const price = `
    ${renderHeader('Usage')}: 
        atcb price [options]

    ${renderHeader('Options')}: 
        --pair  [required]      trading pair, E.g. ${chalk.green('VENBTC')}
        --help  [optional]      bring up this section

    ${renderHeader('Examples')}: 
        * atcb price --pair=ETHBTC
`
