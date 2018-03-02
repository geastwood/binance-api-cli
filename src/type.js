/* @flow */
/* eslint-disable */

declare type TCommand = 'symbol' | 'help' | 'version' | 'balance' | 'price' | 'trade' | 'config' | 'ticker'

declare type TCommandSupported = Array<TCommand>

declare type TCommandRunable = {|
    run: (args: any) => mixed,
    help: (args: any) => void,
|}

declare type TConfigtore = {|
    apiKey: string,
    secret: string,
|}

declare type TSimplePriceShape = {
    [string]: number,
}

type TTradeShape = {|
    id: number,
    orderId: number,
    price: number,
    qty: number,
    commission: number,
    commissionAsset: string,
    time: number,
    isBuyer: boolean,
    isMaker: boolean,
    isBestMatch: boolean,
|}

type TTicker24 = {|
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

type TAppConfig = {|
    apiKey: string,
    secret: string,
    notificationApiToken: string,
    notificationUserKey: string,
    notificationDevice: string,
|}
