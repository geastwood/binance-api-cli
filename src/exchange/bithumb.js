const Exchange = require('./exchange')
const R = require('ramda')
const { formatPrice } = require('../util')

const getAverage = R.path(['data', 'average_price'])
const getAverageNumber = R.compose(Number, getAverage)

class Bithumb extends Exchange {
    constructor() {
        super()
        this.name = 'bithumb'
    }
    async getPrice(pair) {
        const [p1, p2] = pair.split('/')
        const price1 = await fetch(`https://api.bithumb.com/public/ticker/${p1}`).then(res => res.json())
        const price2 = await fetch(`https://api.bithumb.com/public/ticker/${p2}`).then(res => res.json())

        return formatPrice(getAverageNumber(price1) / getAverageNumber(price2))
    }
}

module.exports = Bithumb
