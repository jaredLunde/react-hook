const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const chalk = require('chalk')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))


const readFile = promisify(fs.readFile)

async function buildAll () {
  const ignore = argv.ignore ? new RegExp(argv.ignore) : /babel-presets|create-preset|inst-templates/

  for (let pkg of getPackages(ignore)) {
    const pkgName = path.basename(pkg)
    const spinner = ora(`Building ${pkgName}`).start()
    let pkgJson = await readFile(path.join(pkg, 'package.json'), 'utf8')
    pkgJson = JSON.parse(pkgJson)

    if (pkgJson.scripts === void 0 || pkgJson.scripts.build === void 0) {
      spinner.warn(`Skipped ${chalk.bold(pkgName)}`)
      continue
    }

    await new Promise(
      (resolve, reject) => cmd.get(
        `
          cd ${pkg}
          yarn build ${pkg.includes('babel-presets') ? 'patch' : ''}
        `,
        (err, data, stderr) => {
          spinner.succeed(`Built ${chalk.bold(pkgName)}`)

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

buildAll().then(() => console.log('Finished.'))
