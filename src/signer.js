const crypto = require('crypto')

const sign = (secret, payload) =>
    crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')

module.exports = sign
