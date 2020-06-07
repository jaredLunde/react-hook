<hr>
<div align="center">
  <h1 align="center">
    useCache()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/cache">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/cache?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/cache">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/cache?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/cache">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/cache?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/cache?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/cache</pre>
<hr>

A React hook for accessing an asynchronous key/value cache that persists data between renders and
components. This allows you to do neat stuff like preload data before your next
page or component has even started mounting.

## Contents

| Section                                            | Description                                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [**Quick Start**](#quick-start)                    | A usage example                                                                                                                       |
| [**createCache()** ](#createcacheresolver-lrusize) | Creates an asynchronous LRU cache which can be used with the [`useCache()`](#usecache) hook. Cache keys _must_ be a `string` type.    |
| [**useCache()**](#usecachecache-key-args)          | A hook for reading and loading items from a persistent cache created by the [`createCache()`](#createcacheresolver-lrusize) function. |

## Quick Start

[Check out this example on **CodeSandbox**](https://codesandbox.io/s/react-hookcache-example-9ytyx?file=/src/App.js)

```jsx harmony
import * as React from 'react'
import {createCache, useCache} from '@react-hook/cache'

// Creates a fetch cache w/ a max of 400 entries for JSON requests
const fetchCache = createCache(async (key, options) => {
  const response = await fetch(key, options)
  return response.json()
}, 400)

const Todo = ({id: initialId = 1}) => {
  const [id, setId] = React.useState(initialId)
  const [{status, value, error, cancel}, fetchTodo] = useCache(
    fetchCache,
    `https://jsonplaceholder.typicode.com/todos/${id}`
  )
  // Loads the todo
  React.useEffect(() => {
    // We only want to load our todo if we don't already have it in this
    // case. BUT because the value always persists between 'success' states
    // you could always be revalidating here regardless and change the if ... else
    // blocks to check 'value' instead of 'status' to determine if the todo
    // should display
    if (status === 'idle') {
      fetchTodo()
    }
  }, [fetchTodo, id, status])

  if (status === 'loading') {
    return (
      <div>
        Loading {id}...
        <button onClick={cancel}>Cancel</button>
      </div>
    )
  } else if (status === 'error') {
    return (
      <div>
        Error: {error.mesage} <button onClick={fetchTodo}>Try again</button>
      </div>
    )
  } else if (status === 'cancelled') {
    return (
      <div>
        Cancelled <button onClick={fetchTodo}>Load again</button>
      </div>
    )
  } else if (status === 'success') {
    const nextId = id + 1

    return (
      <div>
        <h1>{value.title}</h1>
        <button
          // Preloads the next todo on mouse enter
          onMouseEnter={() =>
            fetchCache.load(
              `https://jsonplaceholder.typicode.com/todos/${nextId}`
            )
          }
          // Proceeds to the next todo
          onClick={() => setId(nextId)}
        >
          Next todo
        </button>
      </div>
    )
  }
  // 'idle' status
  return null
}
```

## API

### createCache(resolver, lruSize)

Creates an asynchronous LRU cache which can be used with the [`useCache()`](#usecachecache-key-args) hook.
Cache keys _must_ be a `string` type.

```ts
export const createCache = <Value = any, ErrorType = Error>(
  resolve: (key: string, ...args: any[]) => Promise<Value>,
  lruSize = Infinity
): Cache<Value, ErrorType>
```

#### Arguments

| Argument | Type                                              | Default    | Required? | Description                                                                                                                                                                     |
| -------- | ------------------------------------------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resolve  | `(key: string, ...args: any[]) => Promise<Value>` |            | Yes       | A callback that returns the value for a `key`. `...args` in the callback signature are provided by the user when they call [`cache.load()`](#cache).                            |
| lruSize  | `number`                                          | `Infinity` | No        | The max number of key/value pairs to cache at a given time. When the number of cache items exceeds this number, the item least recently accessed will be purged from the cache. |

#### Returns [Cache](#cache)

### useCache(cache, key, ...args)

A hook for reading and loading items from a persistent cache created by the
[`createCache()`](#createcacheresolver-lrusize) function.

```ts
export const useCache = <
  Value = any,
  ErrorType = Error,
  Args extends any[] = any[]
>(
  cache: Cache<Value, ErrorType, Args>,
  key: string,
  ...args: Args
): [
  UseCacheState<Value, ErrorType>,
  () => Promise<CacheState<Value, ErrorType>>
]
```

#### Arguments

| Argument | Type              | Required? | Description                                                 |
| -------- | ----------------- | --------- | ----------------------------------------------------------- |
| cache    | [`Cache`](#cache) | Yes       | A cache created by the `createCache()` function             |
| key      | `string`          | Yes       | The cache key to read or load from the cache                |
| ...args  | `[]`              | No        | Arguments passed to the `cache.load(key, ...args)` function |

#### Returns [[UseCacheState](#usecachestate), `() => Promise<CacheState<Value, ErrorType>>`]

The second element in the array will load the value associated with the provided `key` and
reload it in the case that a value already exists.

## Types

### `Cache`

```ts
export type Cache<
  Value = any,
  ErrorType = Error,
  Args extends any[] = any[]
> = {
  /**
   * Loads a `key` and provides its other ...args to the resolver
   */
  load: (key: string, ...args: Args) => Promise<CacheState<Value, ErrorType>>
  /**
   * Reads a `key` in the LRU cache and returns its value if there is one, otherwise
   * returns undefined
   */
  read: (key: string) => CacheState<Value, ErrorType> | undefined
  /**
   * Cancels any pending promises for `key`
   */
  cancel: (key: string) => void
  /**
   * Returns a {[key: string]: CacheState} object. This can be used
   * for persisting the state rendered on a server to the client.
   */
  readAll: () => CacheExport<CacheState<Value, ErrorType>>
  /**
   * Writes a {[key: string]: CacheState} to the LRU cache. This can be used
   * for persisting the state rendered on a server to the client.
   */
  write: (input: CacheExport<Value, ErrorType>) => void
  /**
   * Subscribes to changes to `key`. That is, `callback` will be invoked
   * any time the state assigned to `key` changed.
   */
  subscribe: (
    key: string,
    callback: CacheSubscribeCallback<CacheState<Value, ErrorType>>
  ) => void
  /**
   * Unsubscribes to changes to `key`
   */
  unsubscribe: (
    key: string,
    callback: CacheSubscribeCallback<CacheState<Value, ErrorType>>
  ) => void
}
```

### `CacheState`

```ts
export type CacheState<Value = any, ErrorType = Error> =
  | {
      id: number
      /**
       * The cache is currently loading a value for this key
       */
      status: 'loading'
      /**
       * This will be the previous value if there is one, otherwise undefined
       */
      value: Value | undefined
      /**
       * Loading states will never have an error message
       */
      error: undefined
    }
  | {
      id: number
      /**
       * The cache has successfully loaded a value for the key
       */
      status: 'success'
      /**
       * This is the value loaded by the cache
       */
      value: Value
      /**
       * Success states will never have an error message
       */
      error: undefined
    }
  | {
      id: number
      /**
       * The cache encountered an error when loading a value for the key
       */
      status: 'error'
      /**
       * This is the previous value if there is one, otherwise undefined
       */
      value: Value | undefined
      /**
       * This is the error object that was caught during execution
       */
      error: ErrorType
    }
  | {
      id: number
      /**
       * The request for this key was cancelled before it was completed
       */
      status: 'cancelled'
      /**
       * This is the previous value if there isone, otherwise undefined
       */
      value: Value | undefined
      /**
       * Cancelled states never have an error message
       */
      error: undefined
    }
```

### `UseCacheState`

```ts
export type UseCacheState<Value = any, ErrorType = Error> =
  | {
      /**
       * The key does not exist in the cache and the cache has not started
       * loading this key
       */
      status: 'idle'
      /**
       * When idle we have no current or previous value available
       */
      value: undefined
      /**
       * No errors will be reported here
       */
      error: undefined
      /**
       * Cancelling will have no effect when idle
       */
      cancel: () => void
    }
  | {
      /**
       * The next value for the key is currently loading in the cache
       */
      status: 'loading'
      /**
       * The previous value for this key will persist during the loading phase.
       */
      value: Value | undefined
      /**
       * No errors will be reported
       */
      error: undefined
      /**
       * Cancelling will prevent the value returned in this request from being
       * added to state
       */
      cancel: () => void
    }
  | {
      /**
       * The key does not exist in the cache and the cache has not started
       * loading this key
       */
      status: 'cancelled'
      /**
       * The previous value for this key will persist during the loading phase.
       */
      value: Value | undefined
      /**
       * No errors will be reported
       */
      error: undefined
      /**
       * Cancelling has no effect here
       */
      cancel: () => void
    }
  | {
      /**
       * We have successfully received a value for the key
       */
      status: 'success'
      /**
       * The value returned by the successful request
       */
      value: Value
      /**
       * No errors will be reported here
       */
      error: undefined
      /**
       * Cancelling will have no effect here
       */
      cancel: () => void
    }
  | {
      /**
       * The promise in the cache encountered an error
       */
      status: 'error'
      /**
       * The last successful value received by the cache will persist here
       */
      value: Value | undefined
      /**
       * This is the error object encountered by the request
       */
      error: ErrorType
      /**
       * Cancelling will have no effect here
       */
      cancel: () => void
    }
```

## LICENSE

MIT
