const moment = require('moment')
const { getTime, getReadableTime } = require('../dist/model/trade/trade')
const mappers = require('../dist/model/mapper')
const { orderBy, findByOrderId } = require('../dist/model/trade/collection')
const { summary } = require('../dist/model/trade/renderer')
const { trades } = require('./fixture')

describe('model/trade', () => {
    beforeEach(() => {
        jasmine.clock().mockDate(moment(1519632197492).toDate())
    })
    it('model methods', () => {
        const [trade] = trades.map(mappers.toTradeData)
        expect(getReadableTime(trade)).toBe('a few seconds ago')
        expect(getTime(trade)).toBe('2018-02-26T09:03:17+01:00')
        expect(trade.orderId).toBe(3314345)
        expect(trade.price).toBe(0.00008153)
        expect(trade.id).toBe(565812)
        expect(trade.qty).toBe(491)
        expect(trade.isBuyer).toBe(true)
        expect(trade.isMaker).toBe(true)
    })
    it('model renderer', () => {
        const [trade] = trades.map(mappers.toTradeData)
        expect(summary(trade)).toBe(
            '[3314345]: BOUGHT with price 0.00008153 for 491 at 2018-02-26T09:03:17+01:00 (a few seconds ago)',
        )
    })
    it('collection/orderBy', () => {
        expect(orderBy(m => [m.id], ['asc'], trades)[0].id).toBe(trades[0].id)
        const reversedTradeList = orderBy(m => [m.id], ['desc'], trades)
        expect(reversedTradeList[0].id).toBe(trades[2].id)
    })
    it('collection/findByOrderId', () => {
        expect(findByOrderId(trades[0].orderId, trades).length).toBe(1)
        expect(findByOrderId(1, trades).length).toBe(0)
    })
})
