const { orderUpdates } = require('./fixture.js')
const binance = require('node-binance-api')
const mappers = require('../dist/model/mapper')
const exchange = require('../dist/exchange')

describe('userData websocket', () => {
    const [newOrder] = orderUpdates
    beforeEach(() => {
        binance.options({
            APIKEY: 'apikey',
            APISECRET: 'secret',
            useServerTime: true,
            test: true,
        })
    })

    it('mapper conversion is in place', () => {
        const subscriber = jasmine.createSpy('subscriber')
        spyOn(mappers, 'toOrderUpdateData').and.returnValue('model')
        const userDataMocked = spyOn(binance.websockets, 'userData').and.callFake((fn1, fn2) => {
            fn2(newOrder)
        })

        exchange.userData('execution', subscriber)

        expect(userDataMocked).toHaveBeenCalledTimes(1)
        expect(mappers.toOrderUpdateData).toHaveBeenCalledTimes(1)
        expect(subscriber).toHaveBeenCalledTimes(1)
        expect(subscriber).toHaveBeenCalledWith('model')
    })
})
