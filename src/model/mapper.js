/* @flow */
const get = require('lodash.get')

exports.toTradeData = (json: {}): TTradeData => {
    const id = get(json, 'id')
    const orderId = get(json, 'orderId')
    const price = Number(get(json, 'price'))
    const qty = Number(get(json, 'qty'))
    const commission = get(json, 'commission')
    const commissionAsset = get(json, 'commissionAsset')
    const time = get(json, 'time')
    const isBuyer = get(json, 'isBuyer')
    const isMaker = get(json, 'isMaker')
    const isBestMatch = get(json, 'isBestMatch')

    return {
        id,
        orderId,
        price,
        qty,
        commission,
        commissionAsset,
        time,
        isBuyer,
        isMaker,
        isBestMatch,
    }
}
exports.toBalanceData = (json: {}): TBalanceData => {
    const symbol = get(json, 'symbol')
    const available = Number(get(json, 'available'))
    const onOrder = Number(get(json, 'onOrder'))

    return {
        symbol,
        available,
        onOrder,
    }
}

const toTickerData = (json: {}): TTickData => {
    const open = Number(get(json, 'o'))
    const high = Number(get(json, 'h'))
    const low = Number(get(json, 'l'))
    const close = Number(get(json, 'c'))
    const volume = Number(get(json, 'v'))
    const tradeCount = get(json, 'n')
    const interval = get(json, 'i')
    const isFinal = get(json, 'x')
    const quoteVolume = Number(get(json, 'q'))
    const buyVolume = Number(get(json, 'V'))
    const quoteBuyVolume = Number(get(json, 'Q'))

    return {
        open,
        high,
        low,
        close,
        volume,
        tradeCount,
        interval,
        isFinal,
        quoteVolume,
        buyVolume,
        quoteBuyVolume,
    }
}

exports.toCandlestickData = (json: { k: {} }): TCandelstickData => {
    const eventType = get(json, 'e', '')
    const eventTime = get(json, 'E', Date.now())
    const symbol = get(json, 's', '')
    const tick = toTickerData(json.k)

    return {
        eventType,
        eventTime,
        symbol,
        tick,
    }
}
