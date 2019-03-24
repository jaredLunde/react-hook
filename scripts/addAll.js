const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const chalk = require('chalk')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))


async function addAll () {
  const ignore = argv.ignore ? new RegExp(argv.ignore) : void 0

  if (typeof argv.dev === 'string') {
    throw `You must define flag '--dev' at the end of your command`
  }

  for (let pkg of getPackages(ignore)) {
    const pkgName = path.basename(pkg)
    const spinner = ora(`Adding ${argv._.join(', ')} to ${pkgName}`).start()
    await new Promise(
      (resolve, reject) => cmd.get(
        `
          cd ${pkg}
          yarn add ${argv.dev ? '--dev' : ''} ${argv._.join(' ')}
        `,
        (err, data, stderr) => {
          spinner.succeed(`Added ${argv._.join(', ')} to ${chalk.bold(pkgName)}`)

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

addAll().then(() => console.log('Finished.'))
