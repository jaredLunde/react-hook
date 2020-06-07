<hr>
<div align="center">
  <h1 align="center">
    useHover()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/hover">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/hover">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/hover">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/hover</pre>
<hr>

A React hook for tracking the hover state of DOM elements in browsers
where hovering is possible. If the browser does not support hover states
(e.g. a phone) the `isHovering` value will always be `false`.

## Quick Start

[Check out the example on **CodeSandbox**](https://codesandbox.io/s/react-hookhover-example-oohtc)

```jsx harmony
import * as React from 'react'
import useHover from '@react-hook/hover'

const Component = (props) => {
  const target = React.useRef(null)
  const isHovering = useHover(target, {enterDelay: 200, leaveDelay: 200})
  return <div ref={target}>{isHovering ? 'Hovering' : 'Not hovering'}</div>
}
```

## API

### useHover(target, options?)

```tsx
function useHover<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseHoverOptions = {}
): boolean
```

#### Arguments

| Argument | Type                                                 | Required? | Description                                                                          |
| -------- | ---------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| target   | <code>React.RefObject<T> &#124; T &#124; null</code> | Yes       | A React ref created by `useRef()` or an HTML element                                 |
| options  | [`UseHoverOptions`](#usehoveroptions)                | Yes       | Configuration options for the hook. See [`UseHoverOptions`](#usehoveroptions) below. |

#### Returns `boolean`

This hook returns `true` if the element in `ref` is in a hover state, otherwise `false`. This value
is always `false` on devices that don't have hover states, i.e. phones.

#### UseHoverOptions

| Property   | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| enterDelay | number | Delays setting `isHovering` to `true` for this amount in `ms`  |
| leaveDelay | number | Delays setting `isHovering` to `false` for htis amount in `ms` |

## LICENSE

MIT
