/* @flow */
import orderByLodash from 'lodash.orderby'

export const findByOrderId = (orderId: number, data: TTradeData[]) => data.filter(item => item.id === orderId)
export const orderBy = (
    pred: (m: TTradeData) => Array<string | number>,
    direction: string[] = ['asc'],
    data: TTradeData[],
) => orderByLodash(data, pred, direction)
