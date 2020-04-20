## Contributing

To contribute to this project, first:

1. Fork this repo to your account
2. `git clone https://github.com/[your-username]/react-hook.git`
3. `cd react-hook`

Packages must be installed individually. They must also be installed using the `yarn` packager. An example for working on `throttle`:

1. `cd packages/throttle`
2. `yarn install`

### Development scripts

Each individual package includes the following scripts:

- `build`: Builds CJS and ES modules, as well as types
- `build:cjs`: Builds CJS module
- `build:es`: Builds ES module
- `build:types`: Builds types
- `check-types`: Checks types
- `format`: Formats the package w/ Prettier
- `lint`: Lints the package w/ eslint
- `test`: Tests the package w/ Jest
- `validate`: Tests, lints, and checks types for the package

#### Watching the ES module build:

`yarn build:es -w`

#### Watching the CJS module build:

`yarn build:cjs -w`

#### Watching tests:

`yarn test --watch`

### Submitting a pull request

Prior to submitting a pull request please ensure that `yarn validate` passes. Please also include a tag with the packages you updated in your commit message e.g. `[throttle] Fixes issue where setState was not called on the leading edge`.
