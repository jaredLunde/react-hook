const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const chalk = require('chalk')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))


async function removeAll () {
  const ignore = argv.ignore ? new RegExp(argv.ignore) : void 0

  for (let pkg of getPackages(ignore)) {
    const pkgName = path.basename(pkg)
    const spinner = ora(`Removing ${argv._.join(', ')} to ${pkgName}`).start()
    await new Promise(
      (resolve, reject) => cmd.get(
        `
          cd ${pkg}
          yarn remove ${argv._.join(' ')}
        `,
        (err, data, stderr) => {
          spinner.succeed(`Removed ${argv._.join(', ')} to ${chalk.bold(pkgName)}`)

          if (!err) {
            resolve(data)
          } else {
            reject(err)
          }
        }
      )
    )
  }
}

removeAll().then(() => console.log('Finished.'))
