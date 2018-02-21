const crypto = require('crypto')

const secret = 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
const payload =
    'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559'

const sign = (secret, payload) =>
    crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')

module.exports = sign
