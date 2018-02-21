const apiUrl = 'https://api.binance.com/api'

const buildQuery = q => (q ? `?${q}` : '')

module.exports = {
    exchangeInfo: q => `${apiUrl}/v1/exchangeInfo${buildQuery(q)}`,
    account: q => `${apiUrl}/v3/account${buildQuery(q)}`,
}
