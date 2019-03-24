const path = require('path')
const chalk = require('chalk')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))


async function listAll () {
  const ignore = argv.ignore ? new RegExp(argv.ignore) : void 0

  for (let pkg of getPackages(ignore)) {
    console.log(chalk.bold(path.basename(pkg)), chalk.gray(path.relative(process.cwd(), pkg)))
  }
}

listAll()
