<hr>
<div align="center">
  <h1 align="center">
    useMergedRef()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/merged-ref">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/merged-ref?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/merged-ref">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/merged-ref?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/merged-ref">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/merged-ref?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/merged-ref?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/merged-ref</pre>
<hr>

A React hook for merging multiple refs into one ref

## Quick Start

```jsx harmony
import React from 'react'
import useMergedRef from '@react-hook/merged-ref'

const Component = React.forwardRef((props, ref) => {
  const otherRef = React.useRef(null)
  const multiRef = useMergedRef(ref, otherRef)
  return <div ref={multiRef} />
})
```

## API

### `useMergedRef(...refs)`

```ts
function useMergedRef<T>(...refs: React.Ref<T>[]): React.RefCallback<T>
```

| Argument | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| refs     | React callback refs or refs created with `useRef()`, `createRef()` |

#### Returns `React.RefCallback`

Returns a callback ref

## LICENSE

MIT
