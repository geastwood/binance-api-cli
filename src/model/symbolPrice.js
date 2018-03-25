/* @flow */

export const getPair = (data: TSymbolPrice): string => data.pair
export const getPrice = (data: TSymbolPrice): number => Number(data.price)
