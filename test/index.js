const { compare } = require('../src')

exports['index/compare'] = t => {
    t.equal(typeof compare, 'function')
    t.done()
}
