/* @flow */
import get from 'lodash.get'

export const toOpenOrderData = (json: {}): TOpenOrderData => {
    const symbol = get(json, 'symbol')
    const orderId = Number(get(json, 'orderId'))
    const clientOrderId = get(json, 'clientOrderId')
    const price = Number(get(json, 'price'))
    const origQty = Number(get(json, 'origQty'))
    const executedQty = Number(get(json, 'executedQty'))
    const status = get(json, 'status')
    const timeInForce = get(json, 'timeInForce')
    const type = get(json, 'type')
    const side = get(json, 'side')
    const stopPrice = Number(get(json, 'stopPrice'))
    const icebergQty = Number(get(json, 'icebergQty'))
    const time = get(json, 'time')
    const isWorking = get(json, 'isWorking')

    return {
        symbol,
        orderId,
        clientOrderId,
        price,
        origQty,
        executedQty,
        status,
        timeInForce,
        type,
        side,
        stopPrice,
        icebergQty,
        time,
        isWorking,
    }
}

export const toTradeData = (json: {}): TTradeData => {
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

export const toBalanceData = (json: {}): TBalanceData => {
    const symbol = get(json, 'symbol')
    const available = Number(get(json, 'available'))
    const onOrder = Number(get(json, 'onOrder'))

    return {
        symbol,
        available,
        onOrder,
    }
}

export const toTickerData = (json: {}): TTickData => {
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

export const toCandlestickData = (json: { k: {} }): TCandlestickData => {
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

export const toCandlestickKlineData = (json: any[]): TCandlestickKlineData => {
    const [
        time,
        open,
        high,
        low,
        close,
        volume,
        closeTime,
        assetVolume,
        trades,
        buyBaseVolume,
        buyAssetVolume,
        ignored,
    ] = json.map(Number)

    return {
        time: new Date(time),
        open,
        high,
        low,
        close,
        volume,
        closeTime: new Date(closeTime),
        assetVolume,
        trades,
        buyBaseVolume,
        buyAssetVolume,
        ignored,
    }
}

export const toTicker24Data = (json: {}): TTicker24 => {
    const symbol = get(json, 'symbol')
    const priceChange = Number(get(json, 'priceChange'))
    const priceChangePercent = Number(get(json, 'priceChangePercent'))
    const weightedAvgPrice = Number(get(json, 'weightedAvgPrice'))
    const prevClosePrice = Number(get(json, 'prevClosePrice'))
    const lastPrice = Number(get(json, 'lastPrice'))
    const lastQty = Number(get(json, 'lastQty'))
    const bidPrice = Number(get(json, 'bidPrice'))
    const askPrice = Number(get(json, 'askPrice'))
    const openPrice = Number(get(json, 'openPrice'))
    const highPrice = Number(get(json, 'highPrice'))
    const lowPrice = Number(get(json, 'lowPrice'))
    const volume = Number(get(json, 'volume'))
    const quoteVolume = Number(get(json, 'quoteVolume'))
    const openTime = get(json, 'openTime')
    const closeTime = get(json, 'closeTime')
    const fristId = get(json, 'fristId')
    const lastId = get(json, 'lastId')
    const count = get(json, 'count')

    return {
        symbol,
        priceChange,
        priceChangePercent,
        weightedAvgPrice,
        prevClosePrice,
        lastPrice,
        lastQty,
        bidPrice,
        askPrice,
        openPrice,
        highPrice,
        lowPrice,
        volume,
        quoteVolume,
        openTime,
        closeTime,
        fristId,
        lastId,
        count,
    }
}
export const toBalanceUpdateData = (json: {}): TBalnaceUpdateData => {
    const e = get(json, 'e') // Event type
    const E = get(json, 'E') // Event time
    const m = get(json, 'm') // Maker commission rate (bips)
    const t = get(json, 't') // Taker commission rate (bips)
    const b = get(json, 'b') // Buyer commission rate (bips)
    const s = get(json, 's') // Seller commission rate (bips)
    const T = get(json, 'T') // Can trade?
    const W = get(json, 'W') // Can withdraw?
    const D = get(json, 'D') // Can deposit?
    const u = get(json, 'u') // Time of last account update
    const B = get(json, 'B').map(toBalanceData)

    return {
        eventType: e,
        eventTime: E,
        makerCommissionRate: m,
        takerCommissionRate: t,
        buyerCommissionRate: b,
        sellerCommissionRate: s,
        canTrade: T,
        canWithdraw: W,
        canDeposit: D,
        lastUpdatedAt: u,
        balances: B,
    }
}

export const toOrderUpdateData = (json: {}): TOrderUpdateData => {
    const e = get(json, 'e') // Event type
    const E = get(json, 'E') // Event time
    const s = get(json, 's') // Symbol
    const c = get(json, 'c') // Client order ID
    const S = get(json, 'S') // Side
    const o = get(json, 'o') // Order type
    const f = get(json, 'f') // Time in force
    const q = Number(get(json, 'q')) // Order quantity
    const p = Number(get(json, 'p')) // Order price
    const P = Number(get(json, 'P')) // Stop price
    const F = Number(get(json, 'F')) // Iceberg quantity
    const C = get(json, 'C') // Original client order ID; This is the ID of the order being canceled
    const x = get(json, 'x') // Current execution type
    const X = get(json, 'X') // Current order status
    const r = get(json, 'r') // Order reject reason; will be an error code.
    const i = get(json, 'i') // Order ID
    const l = Number(get(json, 'l')) // Last executed quantity
    const z = Number(get(json, 'z')) // Cumulative filled quantity
    const L = Number(get(json, 'L')) // Last executed price
    const n = Number(get(json, 'n')) // Commission amount
    const N = get(json, 'N', 'null') // Commission asset
    const T = get(json, 'T') // Transaction time
    const t = get(json, 't') // Trade ID
    const w = get(json, 'w') // Is the order working? Stops will have
    const m = get(json, 'm') // Is this trade the maker side?

    return {
        eventType: e,
        eventTime: E,
        symbol: s,
        clientOrderId: c,
        side: S,
        orderType: o,
        timeInForce: f,
        qty: q,
        price: p,
        stopPrice: P,
        icebergQty: F,
        originalOrderId: C,
        executionType: x,
        orderStatus: X,
        rejectReason: r,
        orderId: i,
        lastExecutedQty: l,
        cumulativeFilledQty: z,
        lastExecutedPrice: L,
        commissionAmount: n,
        commissionAsset: N,
        transactionTime: T,
        tradeId: t,
        w,
        isMakerSide: m,
    }
}
