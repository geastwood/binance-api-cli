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

SimplePrice.create = data => new SimplePrice(data.symbol, data.price)

module.exports = SimplePrice
