/* @flow */
import { info, err, assertString, assertNotNull } from '../util'
import { sell, prices } from '../exchange'
import { round } from 'mathjs'
import { validateSymbol } from '../butter/symbol'
import { getBalanceBySymbol } from '../butter/balance'

const renderHelp = () => {
    console.log('help for sell is coming soon')
}

type CommandOptions = {
    symbol: string,
    price: string,
    qty: string,
}

const getQty = (qty: string | number, balance: TBalanceData): number | false => {
    let qtyInNumber = 0
    // clean up qty
    if (typeof qty === 'string' && qty.includes('%')) {
        const percentage = parseFloat(qty) / 100
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
    async run({ symbol, price, qty }: CommandOptions) {
        assertString(symbol, '--symbol is required')
        assertNotNull(price, '--price is required')
        assertNotNull(qty, '--qty is required')

        const symbolData = await validateSymbol(symbol)
        if (!symbolData) {
            err(`Can't find symbol ${symbol}`)
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
            priceData = await prices(symbol)
        } catch (e) {
            err(`Error fetch price for ${symbol}`)
            process.exit(1)
            return
        }
        const priceInNumber = getPrice(price, priceData)
        if (priceInNumber === false) {
            process.exit(1)
            return
        }

        try {
            console.log(symbol, qtyInNumber, priceInNumber)
            await sell(symbol, qtyInNumber, round(priceInNumber, 8))
        } catch (e) {
            err(JSON.stringify(e, null, 4))
            process.exit(1)
        }
    },
    help() {
        renderHelp()
    },
}

module.exports = Sell
