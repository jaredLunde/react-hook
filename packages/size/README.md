<hr>
<div align="center">
  <h1 align="center">
    useSize()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/size">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/size">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/size">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/size?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/size</pre>
<hr>

A React hook for measuring the size of HTML elements including when they change

## Features

- [x] Determines the size of the element including any padding, borders, and scroll bars.
- [x] The size reported by the hook updates each time the size of the element changes.
- [x] Uses a single `ResizeObserver` for tracking all elements used by the hooks.
      [This approach is astoundingly more performant](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ)
      than using a `ResizeObserver` per element which most hook implementations do.
- [x] Uses [`@juggle/resize-observer`](https://github.com/juggle/resize-observer) as a ponyfill when `ResizeObserver` isn't supported
      by the current browser.
- [x] Automatically unobserves the target element when the hook unmounts.

## Quick Start

[Check out an example on **CodeSandbox**](https://codesandbox.io/s/react-hooksize-example-vbpnl)

```jsx harmony
import * as React from 'react'
import useSize from '@react-hook/size'

const Component = () => {
  const target = React.useRef(null)
  const [width, height] = useSize(target)

  return (
    <div ref={target}>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
    </div>
  )
}
```

## API

### useSize(target, options?)

| Argument | Type                                                 | Required? | Description                                               |
| -------- | ---------------------------------------------------- | --------- | --------------------------------------------------------- |
| target   | <code>React.RefObject<T> &#124; T &#124; null</code> | Yes       | A React ref created by `useRef()` or an HTML element      |
| options  | [`UseSizeOptions`](#usesizeoptions)                  | No        | Options for SSR. See [`UseSizeOptions`](#usesizeoptions). |

### UseSizeOptions

```ts
export interface UseSizeOptions {
  // The initial width to set into state.
  // This is useful for SSR environments.
  initialWidth: 0
  // The initial height to set into state.
  // This is useful for SSR environments.
  initialHeight: 0
}
```

## LICENSE

MIT
