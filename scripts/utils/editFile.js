const getPackages = require('./getPackages')
const fs = require('fs')
const chalk = require('chalk')
const {promisify} = require('util')
const path = require('path')


const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const rename = promisify(fs.rename)

function editFile (filename, find, replace, opt = {}) {
  const {ignore, dry = false} = opt
  return Promise.all(
    getPackages(ignore).map(
      async dir => {
        const source = path.join(dir, filename)

        if (fs.existsSync(source) === false) {
          return
        }

        const tmpSource = `${source}.tmp`
        const data = await readFile(source, 'utf8')
        const replacement = data.replace(new RegExp(find, 'g'), replace)

        if (replacement === data) {
          return
        }

        if (dry) {
          console.log(
            `[Dry]`,
            '\n------------------------------------------------------------------\n',
            chalk.bold('Found\n'),
            data,
            '\n------------------------------------------------------------------\n',
            chalk.bold('Replaced\n'),
            replacement,
            '\n__________________________________________________________________\n\n',
          )

          return
        }

        console.log('Edited', chalk.bold(source))
        return writeFile(tmpSource, replacement).then(() => rename(tmpSource, source))
      }
    )
  )
}

module.exports = editFile