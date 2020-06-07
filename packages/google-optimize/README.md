<hr>
<div align="center">
  <h1 align="center">
    useGoogleOptimize()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/google-optimize">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/google-optimize?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/google-optimize">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/google-optimize?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/google-optimize">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/google-optimize?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/google-optimize?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/google-optimize</pre>
<hr>

A React hook for using Google Optimize variants in components

## Quick Start

Using the `useGoogleOptimize` hook requires that you've [installed Google Tag Manager](https://support.google.com/optimize/answer/6314801?hl=en)
and created [Google Optimize](https://marketingplatform.google.com/about/optimize/) test cases.

```jsx harmony
import useGoogleOptimize from '@react-hook/google-optimize'
// Test React components
const CartABTest = (props) => {
  const CartVariant = useGoogleOptimize('experimentId', [CartA, CartB, CartC])
  return !CartVariant ? 'Loading...' : <CartVariant {...props} />
}
// Test any value
const CartABValueTest = (props) => {
  const variant = useGoogleOptimize('experimentId', [false, true])
  return variant === null ? (
    'Loading...'
  ) : variant ? (
    <CartA {...props} />
  ) : (
    <CartB {...props} />
  )
}
```

## API

### useGoogleOptimize(experimentId, variants, timeout?)

```ts
function useGoogleOptimize<T>(
  experimentId: string,
  variants: T[],
  timeout?: number
): T | null
```

#### Arguments

| Argument     | Type     | Default     | Required? | Description                                                                                                                                                             |
| ------------ | -------- | ----------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| experimentId | `string` | `undefined` | Yes       | Your Google Optimize experiment id                                                                                                                                      |
| variants     | `T[]`    | `undefined` | Yes       | Two or more experiment variants. The first variant is considered the default.                                                                                           |
| timeout      | `number` | `Infinity`  | No        | This hook will timeout and select the first variant by default if Google Optimize doesn't load within `timeout` milliseconds. By default, this hook will never timeout. |

#### Returns `T | null`

This hook returns the variant selected by Google Optimize. While the variant selection is loading,
this hook returns `null`.

## Future work

In the future this hook snould cause the component to suspend until the variant is available.

## LICENSE

MIT
