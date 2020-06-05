<hr>
<div align="center">
  <h1 align="center">
    usePrevious()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/previous">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/previous?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/previous">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/previous?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/previous">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/previous?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/previous?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/previous</pre>
<hr>

A React hook that stores a value from the previous render.

## Quick Start

```jsx harmony
import * as React from 'react'
import usePrevious from '@react-hook/previous'

const useChanged = (onChange) => {
  const [status, setStatus] = React.useState('off')
  const prevStatus = usePrevious(status)

  React.useEffect(() => {
    if (status !== prevStatus) onChange()
  }, [status])

  return [status, setStatus]
}
```

## API

### usePrevious()

```ts
const usePrevious: <T extends any>(
  value: T,
  initialValue?: T | undefined
) => T | undefined
```

| Argument     | Type            | Default     | Required? | Description                                                               |
| ------------ | --------------- | ----------- | --------- | ------------------------------------------------------------------------- |
| value        | `T`             |             | Yes       | The current value                                                         |
| initialValue | `T | undefined` | `undefined` | No        | The value returned by the hook when the current value has not yet changed |

## LICENSE

MIT
