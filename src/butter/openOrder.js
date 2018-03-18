/* @flow */
import { openOrders } from '../exchange'
import { renderTable } from '../model/orderData'

export const listAllOpenOrdersInTable = async (): Promise<string> => {
    const allOpenOrders = await openOrders()
    const table = renderTable(allOpenOrders)
    return table.toString()
}
