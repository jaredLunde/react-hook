const path = require('path')
const chalk = require('chalk')
const {editFile} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))


async function editAll () {
  const [filename, find, replace] = argv._

  if (!filename) {
    console.log(chalk.red('Error'), 'you must include a filename.')
    return
  }

  if (!find) {
    console.log(chalk.red('Error'), 'you must include a second argument for `find`')
    return
  }

  if (typeof replace !== 'string') {
    console.log(chalk.red('Error'), 'you must include a second argument for `replace`')
    return
  }

  const ignore = argv.ignore ? new RegExp(argv.ignore) : void 0
  await editFile(filename, find, replace, {ignore, dry: argv.dry !== void 0})
}

editAll()
