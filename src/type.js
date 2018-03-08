/* @flow */
/* eslint-disable */

declare type TCommand = 'symbol' | 'help' | 'version' | 'balance' | 'price' | 'trade' | 'config' | 'ticker' | 'live'

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
    price: string,
    qty: string,
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
    priceChange: string,
    priceChangePercent: string,
    weightedAvgPrice: string,
    prevClosePrice: string,
    lastPrice: string,
    lastQty: string,
    bidPrice: string,
    askPrice: string,
    openPrice: string,
    highPrice: string,
    lowPrice: string,
    volume: string,
    quoteVolume: string,
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
