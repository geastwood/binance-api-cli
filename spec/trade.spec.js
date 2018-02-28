const moment = require('moment')
const Trade = require('../dist/model/trade/trade')
const Renderer = require('../dist/model/trade/renderer')
const { trades } = require('./fixture')

describe('model/trade', () => {
    let model = null

    beforeEach(() => {
        model = new Trade(trades[0])
        jasmine.clock().mockDate(moment(1519632197492).toDate())
    })
    it('model methods', () => {
        expect(model.getReadableTime()).toBe('a few seconds ago')
        expect(model.getTime()).toBe('2018-02-26T09:03:17+01:00')
        expect(model.getOrderId()).toBe(3314345)
        expect(model.getPrice()).toBe(0.00008153)
        expect(model.getId()).toBe(565812)
        expect(model.getQty()).toBe(491)
        expect(model.isBuyer()).toBe(true)
        expect(model.isMaker()).toBe(true)
    })
    it('model renderer', () => {
        const renderer = new Renderer(model)

        expect(renderer.summary()).toBe(
            '[3314345]: BOUGHT with price 0.00008153 for 491 at 2018-02-26T09:03:17+01:00 (a few seconds ago)',
        )
    })
})
