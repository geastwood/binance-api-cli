const { orderUpdates } = require('./fixture')
const mappers = require('../dist/model/mapper')
const { renderer } = require('../dist/model/orderUpdate')

const [newOrder, cancelOrder, partiallyFilled] = orderUpdates.map(mappers.toOrderUpdateData)

describe('order upate renderer', () => {
    it('summary', () => {
        expect(renderer.notification(newOrder)).toBe(
            '🙏 [ADABTC-SELL-NEW]: 0.00003577 with qty 100 @ 2018-03-11T07:18:52+01:00 [#17306026-LIMIT]',
        )
        expect(renderer.notification(cancelOrder)).toBe(
            '[ADABTC-SELL-CANCELED]: 0.00003577 with qty 100 @ 2018-03-11T07:20:20+01:00 [#17306026-LIMIT]',
        )
        expect(renderer.notification(partiallyFilled)).toBe(
            '🎉👏 [ADABTC-SELL-TRADE]: 0.00003577 with qty 100 (22/44/22.000%) @ 2018-03-11T07:20:20+01:00 [#17306026-LIMIT]',
        )
    })
})
