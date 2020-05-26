import {
  useDebugValue,
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react'
import {lru} from './lru'
import type {LRUCache} from './lru'

/**
 * Creates an asynchronous LRU cache which can be used with the [`useCache()`](#usecache) hook.
 *  Cache keys _must_ be a `string` type.
 * @param resolve
 * @param lruSize
 */
export const createCache = <
  Value = any,
  ErrorType = Error,
  Args extends any[] = []
>(
  resolve: (key: string, ...args: Args) => Promise<Value>,
  lruSize = Infinity
): Cache<Value, ErrorType, Args> => {
  const cache = lru<string, CacheState<Value, ErrorType>>(lruSize)
  const listeners: Record<
    string,
    LRUCache<CacheSubscribeCallback<CacheState<Value, ErrorType>>, undefined>
  > = {}
  let id = -1
  function dispatch(
    action: CancelAction
  ): CacheState<Value, ErrorType> | undefined
  function dispatch(
    action: LoadingAction | SuccessAction<Value> | ErrorAction<ErrorType>
  ): CacheState<Value, ErrorType>
  function dispatch(action: CacheAction<Value, ErrorType>) {
    const current: CacheState<Value, ErrorType> | undefined = cache.read(
      action.key
    )
    let next = current

    if (action.status === 'loading') {
      next = {
        id: action.id,
        status: action.status,
        value: current?.value,
        error: void 0,
      }
    } else if (action.status === 'cancelled') {
      // We can't cancel a request that isn't already loading, so bail
      if (!current || current.status !== 'loading') return current
      next = {
        id: current.id,
        status: action.status,
        value: current?.value,
        error: void 0,
      }
    } else if (action.status === 'success') {
      // Bails out if the action has been cancelled
      if (
        current &&
        (current.status === 'cancelled' || current.id !== action.id)
      )
        return current
      next = {
        id: action.id,
        status: action.status,
        value: action.value,
        error: void 0,
      }
    } else if (action.status === 'error') {
      // Bails out if the action has been cancelled
      if (
        current &&
        (current.status === 'cancelled' || current.id !== action.id)
      ) {
        return current
      }

      next = {
        id: action.id,
        status: action.status,
        value: current?.value,
        error: action.error,
      }
    } else {
      /* istanbul ignore next */
      throw new Error(`Unrecognized action: ${JSON.stringify(action, null, 2)}`)
    }

    const value = next // TypeScript can be very dumb
    cache.write(action.key, value)
    listeners[action.key]?.forEach((callback) => callback(value))
    return next
  }

  return {
    load: async (key, ...args) => {
      const current = cache.read(key)
      const nextId = ++id
      // Bails out if we are already loading this key
      if (current?.status === 'loading') return current
      dispatch({id: nextId, key, status: 'loading'})

      try {
        const value = await resolve(key, ...args)
        return dispatch({id: nextId, key, status: 'success', value})
      } catch (error) {
        return dispatch({id: nextId, key, status: 'error', error})
      }
    },
    read: (key) => cache.read(key),
    cancel: (key) => dispatch({key, status: 'cancelled'}),
    readAll: () => {
      const output: CacheExport<Value, ErrorType> = {}
      cache.forEach((key, value) => (output[key] = value))
      return output
    },
    write: (input) => {
      for (const key in input) {
        const value = input[key]
        cache.write(key, value)
        listeners[key]?.forEach((callback) => callback(value))
      }
    },
    subscribe: (key, callback) => {
      let listenerCache = listeners[key]

      if (!listenerCache) {
        listenerCache = lru(Infinity)
        listeners[key] = listenerCache
      }

      listenerCache.write(callback, undefined)
    },
    unsubscribe: (key, callback) => {
      listeners[key]?.delete(callback)
    },
  }
}

export type Cache<
  Value = any,
  ErrorType = Error,
  Args extends any[] = any[]
> = {
  /**
   * Preloads a `key` and provides ...args to the resolver
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
  readAll: () => CacheExport<Value, ErrorType>
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

export type CacheExport<Value = any, ErrorType = Error> = Record<
  string,
  CacheState<Value, ErrorType>
>

type CacheAction<Value = any, ErrorType = Error> =
  | LoadingAction
  | CancelAction
  | SuccessAction<Value>
  | ErrorAction<ErrorType>

type LoadingAction = {
  id: number
  key: string
  status: 'loading'
}

type SuccessAction<Value> = {
  id: number
  key: string
  status: 'success'
  value: Value
}

type CancelAction = {
  key: string
  status: 'cancelled'
}

type ErrorAction<ErrorType = Error> = {
  id: number
  key: string
  status: 'error'
  error: ErrorType
}

export type CacheStatus = 'loading' | 'success' | 'error' | 'cancelled'

export interface CacheSubscribeCallback<Value = any> {
  (value: Value): void
}

/**
 * A hook for reading and loading items from a persistent cache created by the
 * `createCache()` function.
 *
 * @param cache A cache created by the `createCache()` function
 * @param key The cache key to read or load from the cache
 * @param args Arguments passed to the `cache.load(key, ...args)` function
 */
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
] => {
  const [state, setState] = useState<{
    key: string
    cache: Cache<Value, ErrorType, Args>
    current: CacheState<Value, ErrorType> | undefined
  }>(
    // Uses an init function because we don't want every render to affect
    // the LRU algorithm when we read the cache
    () => ({
      key,
      cache,
      current: cache.read(key),
    })
  )
  // Allows the most recent arguments to be available in the cached callback below
  const storedArgs = useRef(args)
  storedArgs.current = args
  // If our cache or key changes, we don't have to set the new key/cache in
  // an effect. It can just be done here.
  if (state.cache !== cache || state.key !== key) {
    setState({
      key,
      cache,
      current: cache.read(key),
    })
  }

  useEffect(() => {
    let didUnsubscribe = false

    const checkForUpdates = (
      value: CacheState<Value, ErrorType> | undefined
    ) => {
      if (didUnsubscribe) return
      setState((prev) => {
        // Bails if our cache or key has changed from under us
        if (prev.cache !== cache || prev.key !== key) return prev
        // Bails if our value hasn't changed
        if (prev.current === value) return prev
        return {
          key: prev.key,
          cache,
          current: value,
        }
      })
    }

    cache.subscribe(key, checkForUpdates)
    checkForUpdates(cache.read(key))

    return () => {
      didUnsubscribe = true
      cache.unsubscribe(key, checkForUpdates)
    }
  }, [key, cache])
  // So React DevTools can report the value of the hook
  useDebugValue(state?.current)

  return [
    useMemo<UseCacheState<Value, ErrorType>>(() => {
      const cancel = () => cache.cancel(key)
      if (!state.current) {
        return {
          status: 'idle',
          value: undefined,
          error: undefined,
          cancel,
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id, ...current} = state.current
        return Object.assign(current, {cancel})
      }
    }, [state, key, cache]),
    useCallback(() => cache.load(key, ...storedArgs.current), [key, cache]),
  ]
}

export type UseCacheStatus = 'idle' | CacheStatus
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
