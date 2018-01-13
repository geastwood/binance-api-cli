class Exchange {
    constructor() {
        this.name = 'untitled'
    }
    async getPrice(pair) {
        throw new Error("can't be called from here")
    }
    getName() {
        return this.name
    }
}

module.exports = Exchange
