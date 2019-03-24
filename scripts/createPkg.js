const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const cmd = require('node-cmd')
const editJsonFile = require('edit-json-file')
const argv = require('minimist')(process.argv.slice(2))

const IS_REACT_PKG = true

const pkgName = argv._[0]

if (!pkgName || pkgName === true) {
  console.log('You must include a package name')
  process.exit()
}

async function create (pkgName) {
  const pathName = path.join(__dirname, '../packages/', argv.path || '', pkgName)
  let spinner = ora(`Creating ${pkgName}`).start()

  if (fs.existsSync(pathName)) {
    spinner.stop()
    console.log(`A package already exists at ${pathName}`)
    process.exit()
  }

  await new Promise(
    (resolve, reject) => cmd.get(
      `
          mkdir -p ${pathName}
          mkdir ${path.join(pathName, 'src')}
          touch ${path.join(pathName, 'src/index.js')}
          cd ${pathName}
          yarn init --yes
        `,
      (err, data, stderr) => {
        spinner.stop()

        if (!err) {
          const pkgJson = editJsonFile(path.join(pathName, 'package.json'))
          pkgJson.set('sideEffects', false)
          pkgJson.set('main', 'dist/cjs/index.js')
          pkgJson.set('module', 'dist/es/index.js')
          pkgJson.set(
            'repository',
            `https://github.com/jaredLunde/react-hook/tree/master/packages/${pkgName}`
          )
          pkgJson.set('name', `@react-hook/${pkgName}`)
          pkgJson.set('scripts.build', 'yarn run build:es && yarn run build:cjs')
          pkgJson.set('scripts.build:es', 'rimraf dist/es && cross-env NODE_ENV=production BABEL_ENV=es babel src --out-dir dist/es && npm run prettier:es')
          pkgJson.set('scripts.build:cjs', 'rimraf dist/cjs && cross-env NODE_ENV=production BABEL_ENV=cjs babel src --out-dir dist/cjs && npm run prettier:cjs')
          pkgJson.set('scripts.watch:es', 'rimraf dist/es && cross-env NODE_ENV=production BABEL_ENV=es babel src -w --out-dir dist/es')
          pkgJson.set('scripts.prettier', 'prettier --single-quote --no-semi --no-bracket-spacing --trailing-comma es5 --write')
          pkgJson.set('scripts.prettier:es', 'yarn prettier \"dist/es/**/*.js\"')
          pkgJson.set('scripts.prettier:cjs', 'yarn prettier \"dist/cjs/**/*.js\"')
          pkgJson.set('scripts.prepublishOnly', 'yarn build')
          pkgJson.save()

          const devDeps = []
          const peerDeps = []

          if (IS_REACT_PKG) {
            devDeps.push('@stellar-apps/babel-preset-react')
            peerDeps.push('prop-types@^15.6.0')
            peerDeps.push('react@^16.7.0')
          }

          spinner = ora(`Installing ${pkgName}`).start()

          cmd.get(
            `
              yarn add --cwd ${pathName} --dev @stellar-apps/babel-preset-es rimraf prettier ${devDeps.join(' ')}
              ${peerDeps.length === 0 ? '' : `yarn add --cwd ${pathName} --peer ${peerDeps.join(' ')}`}
            `,
            async (err, data, stderr) => {
              spinner.stop()

              if (!err) {
                await fs.copy(
                  path.join(__dirname, `assets/babel.react.rc`),
                  path.join(pathName, '.babelrc')
                )
                await fs.copy(
                  path.join(__dirname, `assets/gitignore`),
                  path.join(pathName, '.gitignore')
                )
                await fs.copy(
                  path.join(__dirname, `assets/npmignore`),
                  path.join(pathName, '.npmignore')
                )
                await fs.copy(
                  path.join(__dirname, `assets/LICENSE`),
                  path.join(pathName, 'LICENSE')
                )
                await fs.copy(
                  path.join(__dirname, `assets/README.md`),
                  path.join(pathName, 'README.md')
                )
                resolve(data)
              }
              else {
                console.log(err)
                reject(err)
              }
            }
          )
        } else {
          reject(err)
        }
      }
    )
  )
}

create(pkgName).then(() => console.log('Finished.'))
