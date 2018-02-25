/* @flow */

const crypto = require('crypto')
const { getConfigstore } = require('./config')
const qs = require('query-string')

const sign = (s: string, payload: string) =>
    crypto
        .createHmac('sha256', s)
        .update(payload)
        .digest('hex')

exports.withSignature = (raw: {}) => {
    const payload = qs.stringify(raw)
    const secret = getConfigstore().get('secret')

    return `${payload}&signature=${sign(secret, payload)}`
}

exports.sign = sign
