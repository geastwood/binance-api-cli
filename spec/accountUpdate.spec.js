const { orderUpdates, balanceUpdateData } = require('./fixture')
const mappers = require('../dist/model/mapper')
const { renderer } = require('../dist/model/accountUpdate')

const [newOrder, cancelOrder, partiallyFilled] = orderUpdates.map(mappers.toOrderUpdateData)
const balanceUpdate = mappers.toBalanceUpdateData(balanceUpdateData)

describe('order upate renderer', () => {
    it('notificationOrderUpdate', () => {
        expect(renderer.notificationOrderUpdate(newOrder)).toBe(
            '🙏 [ADABTC-SELL-NEW]: 0.00003577 with qty 100 @ 2018-03-11T07:18:52+01:00 [#17306026-LIMIT]',
        )
        expect(renderer.notificationOrderUpdate(cancelOrder)).toBe(
            '[ADABTC-SELL-CANCELED]: 0.00003577 with qty 100 @ 2018-03-11T07:20:20+01:00 [#17306026-LIMIT]',
        )
        expect(renderer.notificationOrderUpdate(partiallyFilled)).toBe(
            '🎉👏 [ADABTC-SELL-TRADE]: 0.00003577 with qty 100 (22/44/22.000%) @ 2018-03-11T07:20:20+01:00 [#17306026-LIMIT]',
        )
    })
    it('notificationBalanceUpdate', () => {
        expect(renderer.notificationBalanceUpdate(balanceUpdate)).toBe(
            'Account update receive @ 2018-03-17T08:05:02+01:00',
        )
    })
})
