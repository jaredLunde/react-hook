<hr>
<div align="center">
  <h1 align="center">
    useResizeObserver()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/resize-observer">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/resize-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/resize-observer">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/resize-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/resize-observer">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/resize-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/resize-observer?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/resize-observer</pre>
<hr>

A React hook that fires a callback whenever ResizeObserver detects a change to its size.

## Features

- [x] Uses a single `ResizeObserver` for tracking all elements used by the hooks.
      [This approach is astoundingly more performant](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ)
      than using a `ResizeObserver` per element which most hook implementations do.
- [x] Uses [`@juggle/resize-observer`](https://github.com/juggle/resize-observer) as a ponyfill when `ResizeObserver` isn't supported
      by the current browser.
- [x] Automatically unobserves the target element when the hook unmounts.
- [x] You don't have to wrap your callback in `useCallback()` because any mutations
      are handled by the hook.

## Quick Start

[Check out an example on **CodeSandbox**](https://codesandbox.io/s/react-hookresize-observer-example-ft88x)

```jsx harmony
import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'

const useSize = (target) => {
  const [size, setSize] = React.useState()

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}

const App = () => {
  const target = React.useRef(null)
  const size = useSize(target)
  return (
    <pre ref={target}>
      {JSON.stringify({width: size.width, height: size.height}, null, 2)}
    </pre>
  )
}
```

## API

### useResizeObserver(target, callback)

```ts
function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback
): ResizeObserver
```

| Argument | Type                                                      | Required? | Description                                                               |
| -------- | --------------------------------------------------------- | --------- | ------------------------------------------------------------------------- |
| target   | <code>React.RefObject<T> &#124; T &#124; null</code>      | Yes       | A React ref created by `useRef()` or an HTML element                      |
| callback | [`UseResizeObserverCallback`](#useresizeobservercallback) | Yes       | Invoked with a single `ResizeObserverEntry` any time the `target` resizes |

## Types

### UseResizeObserverCallback

```ts
export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => any
```

## LICENSE

MIT
