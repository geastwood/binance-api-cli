class SimplePrice {
    constructor(symbol, price) {
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
