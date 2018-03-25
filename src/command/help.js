/* @flow */

import pkg from '../../package.json'
import chalk from 'chalk'
import figures from 'figures'

const renderHelp = () => {
    console.log('')
    console.log(pkg.description)
    console.log(figures.arrowRight, `Version: ${chalk.green(pkg.version)}`)
    console.log(figures.arrowRight, 'Should help for individual comment by runing', chalk.green('atcb [COMMAND]'))
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
