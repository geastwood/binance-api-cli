const moment = require('moment')
const Trade = require('../dist/model/trade/trade')
const Collection = require('../dist/model/trade/collection')
const Renderer = require('../dist/model/trade/renderer')
const { trades } = require('./fixture')

describe('model/trade', () => {
    let model = null
    let model3 = null

    beforeEach(() => {
        model = new Trade(trades[0])
        model2 = new Trade(trades[1])
        model3 = new Trade(trades[2])
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
    it('collection/all', () => {
        const coll = Collection.create(trades)
        expect(coll.all()).toEqual(trades.map(Trade.create))
    })
    it('collection/orderBy', () => {
        const coll = Collection.create(trades)
        expect(coll.orderBy(m => [m.getId()])[0].getId()).toBe(model.getId())
        expect(coll.orderBy(m => [m.getId()], ['desc'])[0].getId()).toBe(model3.getId())
    })
    it('collection/findByOrderId', () => {
        const coll = Collection.create(trades)
        expect(coll.findByOrderId(model.getOrderId()).length).toBe(1)
        expect(coll.findByOrderId(1).length).toBe(0)
    })
})
