<hr>
<div align="center">
  <h1 align="center">
    useChange()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/change">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/change?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/change">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/change?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/change">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/change?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/change?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/change</pre>
<hr>

A React hook that invokes a callback anytime a value changes

## Quick Start

```jsx harmony
import useChange from '@react-hook/change'

const useChangeLog = (value) => {
  // Logs the value each time it changes
  useChange(value, console.log)
}
```

## API

### useChange(value, onChange)

```ts
const useChange = <T extends any>(
  value: T,
  onChange: (current: T, prev: T) => any
): void
```

| Argument | Type                           | Required? | Description                                           |
| -------- | ------------------------------ | --------- | ----------------------------------------------------- |
| value    | `T`                            | Yes       | The value to watch for changes to                     |
| onChange | `(current: T, prev: T) => any` | Yes       | This callback is invoked any time the `value` changes |

### Returns `void`

## LICENSE

MIT
