/* @flow */
const get = require('lodash.get')

exports.toBalanceData = (json: {}): TBalanceData => {
    const symbol = get(json, 'symbol')
    const available = get(json, 'available')
    const onOrder = get(json, 'onOrder')

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
