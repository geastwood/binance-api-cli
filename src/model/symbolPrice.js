/* @flow */

export const getSymbol = (data: TSymbolPrice): string => data.symbol
export const getPrice = (data: TSymbolPrice): number => Number(data.price)
