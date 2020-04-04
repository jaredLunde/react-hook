<hr>
<div align="center">
  <h1 align="center">
    useTimeout()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/timeout">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/timeout?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/timeout">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/timeout?style=for-the-badge&labelColor=24292e">
  </a>
  <!--<a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>-->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/timeout">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/timeout?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/timeout?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/timeout</pre>
<hr>

A React hook that executes a callback after a timeout ms have been exceeded and the timeout has been started

## Quick Start

```jsx harmony
import {useEffect} from 'react'
import {useTimeout, useTimeoutCallback} from '@react-hook/timeout'

// useTimeout() example
const Copy = ({text, resetAfterMs = 500}) => {
  const [copied, copy] = useCopy(text)
  const [timedOut, startTimeout, resetTimeout] = useTimeout(resetAfterMs)

  // Reset the timeout any time text changes
  useEffect(() => resetTimeout, [text, resetTimeout])
  // Start the timeout when copied
  useEffect(() => {
    if (copied) {
      startTimeout()
    }
  }, [startTimeout, copied])

  return <input onClick={copy} value={text} />
}

// useTimeoutCallback() example
// This is the exact code useTimeout() uses
const useTimeoutClone = (ms) => {
  const [timedOut, setTimedOut] = useState(false)
  const [start, reset] = useTimeoutCallback(() => setTimedOut(true), ms, [ms])
  return [timedOut, start, reset]
}
```

## API

```tsx
function useTimeout(ms = 0): [boolean, () => void, () => void]
```

| Argument | Type     | Default | Required? | Description                                                                                                                                                                                       |
| -------- | -------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ms       | `number` | `0`     | No        | This is the timeout duration in milliseconds. When this threshold has been reached after `start()` has been invoked, `timedOut` will be `true`. If this value is `0` the hook will never timeout. |

Returns `[timedOut: boolean, start: () => void, reset: () => void]`

```tsx
function useTimeoutCallback(
  callback: (...args: any[]) => any,
  ms = 0,
  dependencies: any[] = [callback, ms]
): [() => void, () => void]
```

| Argument     | Type                       | Default          | Required? | Description                                                                                                                                                                                          |
| ------------ | -------------------------- | ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback     | `(...args: any[]) => void` | `undefined`      | Yes       | This is the callback you want to fire after the timeout duration is exceeded when `start()` is invoked.                                                                                              |
| ms           | `number`                   | `0`              | No        | This is the timeout duration in milliseconds. When this threshold has been reached after `start()` has been invoked, `timedOut` will be `true`. If this value is `0` the hook will never timeout.    |
| dependencies | `any[]`                    | `[callback, ms]` | No        | This is a dependencies array provided to the underlying `useCallback()` hook. Anytime your dependencies change, the timeout will be reset to an idle state and any pending timeouts will not invoke. |

Returns `[start: () => void, reset: () => void]`

## LICENSE

MIT
