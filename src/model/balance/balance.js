const { Map } = require('immutable')

const Balance = class {
    constructor(id, data) {
        this.id = id
        this.data = new Map(data)
    }

    getId() {
        return this.id
    }

    getFree() {
        return Number(this.data.get('available'))
    }

    getLocked() {
        return Number(this.data.get('onOrder'))
    }
}

Balance.create = (id, data) => new Balance(id, data)

module.exports = Balance
