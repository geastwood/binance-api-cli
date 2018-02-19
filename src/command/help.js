const pkg = require('../../package.json')
const chalk = require('chalk')

module.exports.run = () => {
    console.log('')
    console.log(pkg.description)
    console.log(`version: ${chalk.green(pkg.version)}`)
    process.exit(0)
}
