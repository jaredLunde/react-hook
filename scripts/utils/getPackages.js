const fs = require('fs')
const path = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
module.exports = () => {
  const source = path.join(__dirname, '../../packages')
  return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
}
