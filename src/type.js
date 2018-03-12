/* @flow */
/* eslint-disable */

declare type TCommand =
    | 'symbol'
    | 'help'
    | 'version'
    | 'balance'
    | 'price'
    | 'trade'
    | 'config'
    | 'ticker'
    | 'live'
    | 'candlestick'
    | 'liveupdate'

declare type TOrderSideEnum = 'SELL' | 'BUY'

declare type TOrderStatusEnum =
    | 'NEW'
    | 'PARTIALLY_FILLED'
    | 'FILLED'
    | 'CANCELED'
    | 'PENDING_CANCEL'
    | 'REJECTED'
    | 'EXPIRED'

declare type TOrderTypeEnum =
    | 'LIMIT'
    | 'MARKET'
    | 'STOP_LOSS'
    | 'STOP_LOSS_LIMIT'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT'
    | 'LIMIT_MAKER'

declare type TOrderExecutionTypeEnum = 'NEW' | 'CANCELED' | 'REJECTED' | 'TRADE' | 'EXPIRED'

// check mapper for description
declare type TOrderUpdateData = {
    eventType: 'executionReport',
    eventTime: number,
    symbol: string,
    clientOrderId: string,
    side: TOrderSideEnum,
    orderType: TOrderTypeEnum,
    timeInForce: string,
    qty: number,
    price: number,
    stopPrice: number,
    icebergQty: number,
    originalOrderId: string,
    executionType: TOrderExecutionTypeEnum,
    orderStatus: TOrderStatusEnum,
    rejectReason: string,
    orderId: number,
    lastExecutedQty: number,
    cumulativeFilledQty: number,
    lastExecutedPrice: number,
    commissionAmount: number,
    commissionAsset: null,
    transactionTime: Date,
    tradeId: number,
    w: number,
    isMakerSide: boolean,
}

declare type TIntervalEnum =
    | '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '3d'
    | '1w'
    | '1M'

declare type TTickData = {|
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    tradeCount: number,
    interval: TIntervalEnum,
    isFinal: boolean,
    quoteVolume: number,
    buyVolume: number,
    quoteBuyVolume: number,
|}

declare type TOpenOrderData = {|
    symbol: string,
    orderId: number,
    clientOrderId: string,
    price: number,
    origQty: number,
    executedQty: number,
    status: TOrderStatusEnum,
    timeInForce: 'GTC',
    type: TOrderTypeEnum,
    side: TOrderSideEnum,
    stopPrice: number,
    icebergQty: number,
    time: Date,
    isWorking: boolean,
|}

declare type TCandelstickData = {|
    eventType: string,
    eventTime: Date,
    symbol: string,
    tick: TTickData,
|}

declare type TCommandSupported = Array<TCommand>

declare type TSymbolData = {|
    symbol: string,
    status: string,
    baseAsset: string,
    baseAssetPrecision: number,
    quoteAsset: string,
    quotePrecision: number,
    orderTypes: string[],
    icebergAllowed: boolean,
    filters: string[],
|}

declare type TBalanceData = {|
    symbol: string,
    available: number,
    onOrder: number,
|}

declare type TCommandRunable = {|
    run: (args: any) => mixed,
    help: (args: any) => void,
|}

declare type TConfigtore = {|
    apiKey: string,
    secret: string,
|}

declare type TTradeData = {|
    id: number,
    orderId: number,
    price: number,
    qty: number,
    commission: number,
    commissionAsset: string,
    time: Date,
    isBuyer: boolean,
    isMaker: boolean,
    isBestMatch: boolean,
|}

declare type TTradeWithSymbolData = {|
    ...$Exact<TTradeData>,
    symbol: string,
|}

declare type TTicker24 = {|
    symbol: string,
    priceChange: number,
    priceChangePercent: number,
    weightedAvgPrice: number,
    prevClosePrice: number,
    lastPrice: number,
    lastQty: number,
    bidPrice: number,
    askPrice: number,
    openPrice: number,
    highPrice: number,
    lowPrice: number,
    volume: number,
    quoteVolume: number,
    openTime: number,
    closeTime: number,
    fristId: number,
    lastId: number,
    count: number,
|}

declare type TAppConfig = {|
    apiKey: string,
    secret: string,
    notificationApiToken: string,
    notificationUserKey: string,
    notificationDevice: string,
|}

declare type TAggTradeData = {|
    e: 'aggTrade', // Event type
    E: Date, // Event time
    s: string, // Symbol
    a: number, // Aggregate trade ID
    p: string, // Price
    q: string, // Quantity
    f: number, // First trade ID
    l: number, // Last trade ID
    T: Date, // Trade time
    m: boolean, // Is the buyer the market maker?
    M: boolean, // Ignore.
|}

declare type TSymbolPrice = {|
    symbol: string,
    price: string,
|}
