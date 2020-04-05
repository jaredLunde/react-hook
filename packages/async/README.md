<hr>
<div align="center">
  <h1 align="center">
    useAsync()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/async">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/async?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/async">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/async?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/async">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/async?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/async?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/async</pre>
<hr>

A React hook for gracefully resolving, cancelling, and handling errors for async functions
and promises.

## Quick Start

[Check out the example on CodeSandbox](https://codesandbox.io/s/react-hookasync-example-kdghe)

```jsx harmony
import {useAsync, useAsyncEffect} from '@react-hook/async'

// Example using a manual invocation
const CallbackResolver = () => {
  const [{status, cancel, error, value}, call] = useAsync(() => {
    return new Promise((resolve) => setTimeout(() => resolve('Loaded'), 3000))
  }, [])

  switch (status) {
    case 'loading':
      return (
        <div>
          <button onClick={cancel}>Cancel</button>
          Loading...
        </div>
      )
    case 'cancelled':
      return (
        <div>
          Cancelled.
          <button onClick={call}>Try again</button>
        </div>
      )
    case 'error':
      return `Error: ${error}`
    case 'success':
      return value || 'Success!'
    default:
      return <button onClick={call}>Load me</button>
  }
}

// Example using a useEffect invocation
const EffectResolver = () => {
  const [curr, setCurr] = useState(0)
  // Will load each time counter changes
  const {status, cancel, error, value} = useAsyncEffect(() => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Loaded ${curr}`), 3000)
    )
  }, [curr])

  switch (status) {
    case 'loading':
      return (
        <div>
          <button onClick={cancel}>Cancel</button>
          Loading...
        </div>
      )
    case 'cancelled':
      return (
        <div>
          Cancelled.
          <button onClick={() => setCurr((curr) => ++curr)}>Try again</button>
        </div>
      )
    case 'error':
      return `Error: ${error}`
    case 'success':
      return (
        <div>
          {value}
          <button onClick={() => setCurr((curr) => ++curr)}>Load again</button>
        </div>
      )
    default:
      return null
  }
}
```

## API

```ts
function useAsync<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies: any[] = []
): [AsyncState<PromiseReturnType, ErrorType>, AsyncCallback]
```

### Arguments

| Argument      | Type                                             | Default     | Required? | Description                                                                                                                      |
| ------------- | ------------------------------------------------ | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| asyncCallback | `(...args: any[]) => Promise<PromiseReturnType>` | `undefined` | Yes       | An async function or function that returns a promise.                                                                            |
| dependencies  | `any[]`                                          | `[]`        | No        | Values or state that your callback depends on. This works the same as the dependencies array of `useEffect`, `useCallback`, etc. |

### Returns [[`AsyncState<PromiseReturnType, ErrorType>`](#asyncstate), [`AsyncCallback`](#asynccallback)]]

---

## `AsyncState`

```ts
export interface AsyncState<ValueType, ErrorType> {
  // 'idle' | 'loading' | 'success' | 'error' | 'cancelled'
  status: AsyncStatus
  // The return value of your async callback or promise
  value?: ValueType
  // The error object from any exceptions encountered inside the async function
  // or the value of the promise rejection
  error?: ErrorType
  // Cancels the
  cancel: () => void
}
```

## `AsyncCallback`

```ts
export interface AsyncCallback {
  (...args: any[]): void
  // `true` if the callback has been cancelled, otherwise `false`
  cancelled: boolean
}
```

---

```ts
function useAsyncEffect<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies?: any[]
): AsyncState<PromiseReturnType, ErrorType>
```

This hook will invoke a callback each time its dependencies array changes.

### Arguments

| Argument      | Type                                             | Default     | Required? | Description                                                                                                                      |
| ------------- | ------------------------------------------------ | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| asyncCallback | `(...args: any[]) => Promise<PromiseReturnType>` | `undefined` | Yes       | An async function or function that returns a promise.                                                                            |
| dependencies  | `any[]`                                          | `[]`        | No        | Values or state that your callback depends on. This works the same as the dependencies array of `useEffect`, `useCallback`, etc. |

### Returns [`AsyncState<PromiseReturnType, ErrorType>`](#asyncstate)

## LICENSE

MIT
