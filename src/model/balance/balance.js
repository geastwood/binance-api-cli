/* @flow */

const getSymbol = ({ symbol }: TBalanceData) => symbol
const getFree = ({ available }: TBalanceData) => Number(available)
const getLocked = ({ onOrder }: TBalanceData) => Number(onOrder)

module.exports = {
    getSymbol,
    getFree,
    getLocked,
}
