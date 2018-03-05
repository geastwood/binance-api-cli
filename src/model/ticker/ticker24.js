/* @flow */
const moment = require('moment')

const getSymbol = (data: TTicker24) => data.symbol
const getPriceChangePercert = (data: TTicker24) => Number(data.priceChangePercent) / 100
const getOpenTime = (data: TTicker24) => moment(data.openTime).format()
const getCloseTime = (data: TTicker24) => moment(data.closeTime).format()
const getBidPrice = (data: TTicker24) => Number(data.bidPrice)
const getAskPrice = (data: TTicker24) => Number(data.askPrice)
const getOpenPrice = (data: TTicker24) => Number(data.openPrice)
const getHighPrice = (data: TTicker24) => Number(data.highPrice)
const getLowPrice = (data: TTicker24) => Number(data.lowPrice)
const getVolume = (data: TTicker24) => Number(data.volume)

module.exports = {
    getSymbol,
    getPriceChangePercert,
    getOpenTime,
    getCloseTime,
    getBidPrice,
    getAskPrice,
    getOpenPrice,
    getHighPrice,
    getLowPrice,
    getVolume,
}
