/* @flow */

const crypto = require('crypto')
const { secret } = require('../config/config.json')
const qs = require('query-string')

const sign = (s: string, payload: string) =>
    crypto
        .createHmac('sha256', s)
        .update(payload)
        .digest('hex')

exports.withSignature = (raw: {}) => {
    const payload = qs.stringify(raw)

    return `${payload}&signature=${sign(secret, payload)}`
}

exports.sign = sign
