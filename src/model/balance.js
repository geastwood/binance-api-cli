const { Map } = require('immutable')

const Balance = class {
    constructor(data) {
        this.data = new Map(data)
    }

    getId() {
        return this.data.get('asset')
    }

    getFree() {
        return this.data.get('free')
    }

    getLocked() {
        return this.data.get('locked')
    }
}

Balance.create = data => new Balance(data)

module.exports = Balance
