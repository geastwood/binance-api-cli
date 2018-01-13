const Exchange = require('./exchange')
const { formatPrice } = require('../util')

class Binance extends Exchange {
    constructor() {
        super()
        this.name = 'binance'
    }
    async getPrice(pair) {
        const rst = await fetch(
            `https://api.binance.com/api/v3/ticker/price?symbol=${pair.replace('/', '').toUpperCase()}`,
        ).then(res => res.json())
        return formatPrice(rst.price)
    }
}

module.exports = Binance
