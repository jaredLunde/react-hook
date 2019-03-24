const fs = require('fs')
const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const chalk = require('chalk')
const semver = require('semver')
const {promisify} = require('util')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2))
const readFile = promisify(fs.readFile)

let versionBump, preId

switch (argv._[0]) {
  case 'prerelease':
    preId = argv.preid
    if (['beta', 'alpha'].includes(preId) === false) {
      throw `Option --preid must be either 'beta' or 'alpha'`
    }
  case 'major':
  case 'minor':
  case 'patch':
    versionBump = argv._[0]
    break;
  default:
    throw `Must include first option for version bump (prerelease, major, minor, patch)`
}

async function publishAll () {
  const ignore = argv.ignore ? new RegExp(argv.ignore) : /babel-presets|create-preset/

  for (let pkg of getPackages(ignore)) {
    let data = await readFile(path.join(pkg, 'package.json'))
    data = JSON.parse(data)
    const spinner = ora(`Publishing ${chalk.bold(data.name)}`).start()
    const nextVersion = semver.inc(data.version, versionBump, preId)

    await new Promise(
      (resolve, reject) => {
        cmd.get(
          `
            cd ${pkg}
            yarn publish --new-version ${nextVersion} --no-git-tag-version
          `,
          (err, result) => {
            spinner.succeed(`Published ${chalk.bold(data.name)}`)

            if (!err || err.code == 0) {
              resolve(result)
            } else {
              reject(err)
            }
          }
        )
      }
    )
  }
}

publishAll().then(() => console.log('Finished.'))
