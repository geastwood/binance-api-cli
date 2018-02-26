/* @flow */

class SimplePrice {
    symbol: string
    price: string

    constructor(symbol: string, price: string) {
        this.symbol = symbol
        this.price = price
    }

    getId() {
        return this.symbol
    }

    getPrice() {
        return Number(this.price)
    }
}

module.exports = SimplePrice
