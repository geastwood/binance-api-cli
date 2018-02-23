const { log } = require('../util')
const { Map } = require('immutable')

const Symbol = class {
    constructor(data) {
        this.data = new Map(data)
    }

    getId() {
        return this.data.get('id')
    }

    getStatus() {
        return this.data.get('status')
    }

    getDescritpion() {
        const id = this.getId()
        const status = this.getStatus()

        return `${id} is ${status}`
    }

    isBaseAsset(symbol) {
        return this.getBaseAsset() === symbol
    }

    getBaseAsset() {
        return this.data.get('baseAsset')
    }

    getQuoteAsset() {
        return this.data.get('quoteAsset')
    }

    print() {
        log(this.data)
    }
}

Symbol.create = data => new Symbol(data)

module.exports = Symbol
