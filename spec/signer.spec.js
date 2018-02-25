const { sign, withSignature } = require('../dist/signer')

describe('signer', () => {
    it('sign', () => {
        const secret = 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
        const payload =
            'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559'

        expect(sign(secret, payload)).toEqual('c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71')
    })

    it('withSignature', () => {
        expect(withSignature({ foo: 'bar' })).toBe(
            'foo=bar&signature=98ab2f528ce9456b2330f0a71065b2d99ca6c24101b644cd174823d1d61ae4a4',
        )
    })
})
