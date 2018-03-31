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

export const buy = `
    ${renderHeader('Description')}:
        This command place a limit buy order interactively

    ${renderHeader('Usage')}:
        atcb buy

`
export const sell = `
    ${renderHeader('Description')}:
        This command place a limit sell order

    ${renderHeader('Usage')}:
        atcb sell [options]


    ${renderHeader('Options')}:
        --pair  [required]      specify trading pair
        --price [required]      specify the price to sell, can be a real price value
                                or relative percentage e.g. 120%
        --qty   [required]      specify the qty to sell, can be a real number
                                relative percentage e.g. 90%, if percentage is specified
                                max value is 100%

    ${renderHeader('Examples')}: 
        * atcb sell --pair=ETHBTC --price=120% --qty=10 // selling 10 ETH with 120% of current market price
`
