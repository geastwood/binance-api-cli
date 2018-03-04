const moment = require('moment')
const {
    getId,
    getOrderId,
    getTime,
    getReadableTime,
    getPrice,
    getQty,
    isBuyer,
    isMaker,
} = require('../dist/model/trade/trade')
const { orderBy, findByOrderId } = require('../dist/model/trade/collection')
const { summary } = require('../dist/model/trade/renderer')
const { trades } = require('./fixture')

describe('model/trade', () => {
    beforeEach(() => {
        jasmine.clock().mockDate(moment(1519632197492).toDate())
    })
    it('model methods', () => {
        const [trade] = trades
        expect(getReadableTime(trade)).toBe('a few seconds ago')
        expect(getTime(trade)).toBe('2018-02-26T09:03:17+01:00')
        expect(getOrderId(trade)).toBe(3314345)
        expect(getPrice(trade)).toBe(0.00008153)
        expect(getId(trade)).toBe(565812)
        expect(getQty(trade)).toBe(491)
        expect(isBuyer(trade)).toBe(true)
        expect(isMaker(trade)).toBe(true)
    })
    it('model renderer', () => {
        const [trade] = trades
        expect(summary(trade)).toBe(
            '[3314345]: BOUGHT with price 0.00008153 for 491 at 2018-02-26T09:03:17+01:00 (a few seconds ago)',
        )
    })
    it('collection/orderBy', () => {
        expect(getId(orderBy(m => [getId(m)], ['asc'], trades)[0])).toBe(getId(trades[0]))
        const reversedTradeList = orderBy(m => [getId(m)], ['desc'], trades)
        expect(getId(reversedTradeList[0])).toBe(getId(trades[2]))
    })
    it('collection/findByOrderId', () => {
        expect(findByOrderId(getOrderId(trades[0]), trades).length).toBe(1)
        expect(findByOrderId(1, trades).length).toBe(0)
    })
})
