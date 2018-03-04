/* @flow */

const pkg = require('../../package.json')
const chalk = require('chalk')
const figures = require('figures')

const renderHelp = () => {
    console.log('')
    console.log(pkg.description)
    console.log(figures.arrowRight, `version: ${chalk.green(pkg.version)}`)
    console.log(figures.arrowRight, 'Should help for individual comment by runing', chalk.green('at4b [COMMAND]'))
    console.log('')
    process.exit(0)
}
const Help: TCommandRunable = {
    run() {
        renderHelp()
    },
    help() {
        renderHelp()
    },
}

module.exports = Help
