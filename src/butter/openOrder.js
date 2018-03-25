/* @flow */
import { openOrders } from '../exchange'
import { renderTable } from '../model/orderData'
import { getPriceForPairs } from '../butter/price'

export const listAllOpenOrdersInTable = async (): Promise<string> => {
    const allOpenOrders = await openOrders()
    const prices = await getPriceForPairs(allOpenOrders.map(({ symbol }) => symbol))
    const table = renderTable(allOpenOrders, prices)
    return table.toString()
}
