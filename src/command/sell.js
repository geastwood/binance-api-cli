/* @flow */
import { info, err, assertString, assertNotNull, success } from '../util'
import moment from 'moment'
import { sell, prices } from '../exchange'
import { round } from 'mathjs'
import { getFilteredPrice } from '../butter/price'
import { validateSymbol } from '../butter/symbol'
import { getBalanceBySymbol } from '../butter/balance'
import { confirm } from '../userInput'
import chalk from 'chalk'
import { sell as help } from './docs'

type CommandOptions = {
    pair: string,
    price: string,
    qty: string,
}

const getQty = (qty: string | number, balance: TBalanceData): number | false => {
    let qtyInNumber = 0
    // clean up qty
    if (typeof qty === 'string' && qty.includes('%')) {
        const percentage = Math.min(parseFloat(qty) / 100, 1)
        if (Number.isNaN(percentage)) {
            err(`--qty=${qty} can't be converted to a valid percentage`)
            return false
        }
        info(`Percentage used ${percentage} to multiply available balance`)
        qtyInNumber = percentage * balance.available
    } else {
        qtyInNumber = Number(qty)
        if (Number.isNaN(qtyInNumber)) {
            err(`--qty=${qty} yield not a number`)
            return false
        }
    }
    return qtyInNumber
}

const getPrice = (price: string | number, priceData: TSymbolPrice): number | false => {
    let priceInNumber = 0
    // clean up qty
    if (typeof price === 'string' && price.includes('%')) {
        const percentage = parseFloat(price) / 100
        if (Number.isNaN(percentage)) {
            err(`--price=${price} can't be converted to a valid percentage`)
            return false
        }
        info(`Percentage used ${percentage} to multiply current price`)
        priceInNumber = percentage * priceData.price
    } else {
        priceInNumber = Number(price)
        if (Number.isNaN(priceInNumber)) {
            err(`--price=${price} yield not a number`)
            return false
        }
    }
    return priceInNumber
}

const Sell: TCommandRunable = {
    async run({ pair, price, qty }: CommandOptions) {
        assertString(pair, '--pair is required')
        assertNotNull(price, '--price is required')
        assertNotNull(qty, '--qty is required')

        const symbolData = await validateSymbol(pair)
        if (!symbolData) {
            err(`Can't find pair ${pair}`)
            process.exit(1)
            return
        }

        const balance = await getBalanceBySymbol(symbolData.baseAsset)
        if (!balance) {
            err(`Can't find balance for ${symbolData.baseAsset}`)
            process.exit(1)
            return
        }

        // clean up qty
        const qtyInNumber = getQty(qty, balance)
        if (qtyInNumber === false) {
            process.exit(1)
            return
        }

        // clean up price
        let priceData // eslint-disable-line
        try {
            priceData = await prices(pair)
        } catch (e) {
            err(`Error fetch price for ${pair}`)
            process.exit(1)
            return
        }
        const priceInNumber = getPrice(price, priceData)
        if (priceInNumber === false) {
            process.exit(1)
            return
        }
        const priceInNumberRounded = getFilteredPrice(round(priceInNumber, 8), symbolData.priceFilter)

        const confirmMsg = `Do you want to place a LIMIT ${chalk.yellow('SELL')} order price ${chalk.green.bold(
            priceInNumberRounded,
        )} with qty ${chalk.green.bold(qtyInNumber)}`
        const y = await confirm(confirmMsg)
        if (!y) {
            info('Operation interrupted by user, no damage is done.')
            process.exit(1)
        }

        try {
            const rst = await sell(pair, qtyInNumber, round(priceInNumberRounded, 8))
            success(`SELL order (${rst.orderId}) successfully submitted at ${moment(rst.transactTime).format()}.`)
        } catch (e) {
            err(JSON.stringify(e, null, 4))
            process.exit(1)
        }
    },
    help() {
        console.log(help)
    },
}

module.exports = Sell
