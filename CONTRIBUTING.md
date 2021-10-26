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

- `build`: Builds cjs/esm, types, and umd
- `dev`: Runs cjs and esm builds in `--watch` mode
- `check-types`: Checks TypeScript types
- `format`: Formats the package w/ Prettier
- `lint`: Lints the package w/ eslint
- `test`: Tests the package w/ Jest
- `validate`: Tests, lints, and checks types for the package

### Submitting a pull request

Prior to submitting a pull request please ensure that:

1. `yarn validate` passes
2. You've included a tag with the packages you updated in your commit message e.g. `[throttle] fix: setState was not called on the leading edge`.
3. You've opened an issue prior to large or breaking changes. Talking about it first will increase the likelihood of merging.
