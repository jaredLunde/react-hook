import {useDebugValue, useState, useEffect} from 'react'
import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one'
import {lru} from './lru'
import type {LRUCache} from './lru'

/**
 * Creates an asynchronous LRU cache which can be used with the [`useCache()`](#usecache) hook.
 *  Cache keys _must_ be a `string` type.
 * @param resolve
 * @param lruSize
 */
export const createCache = <Value = any, ErrorType = Error>(
  resolve: (key: string, ...args: any[]) => Promise<Value>,
  lruSize = Infinity
): Cache<Value, ErrorType> => {
  const cache = lru<string, CacheState<Value, ErrorType>>(lruSize)
  const listeners: Record<
    string,
    LRUCache<CacheSubscribeCallback<CacheState<Value, ErrorType>>, undefined>
  > = {}
  let id = -1
  const dispatch = (
    action: CacheAction<Value, ErrorType>
  ): CacheState<Value, ErrorType> => {
    const current: CacheState<Value, ErrorType> = cache.read(action.key)
    let next = current

    if (action.status === 'loading') {
      next = {
        id: action.id,
        status: action.status,
        value: current?.value,
        error: void 0,
      }
    } else if (action.status === 'cancelled') {
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
      if (current && (current.status === 'cancelled' || current.id > action.id))
        return current
      next = {
        id: action.id,
        status: action.status,
        value: current?.value,
        error: action.error,
      }
    }

    cache.write(action.key, next)
    listeners[action.key]?.forEach((callback) => callback(next))
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
      const output = {}
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

export type Cache<Value = any, ErrorType = Error> = {
  /**
   * Preloads a `key` and provides ...args to the resolver
   */
  load: (key: string, ...args: any[]) => Promise<CacheState<Value, ErrorType>>
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

export type CacheState<Value = any, ErrorType = Error> =
  | {
      id: number
      /**
       * This is the current status of the promise or async/await function. A
       * promise or async/await can only be in one state at a time.
       */
      status: 'loading' | 'cancelled'
      /**
       * The value is persisted between 'success' statuses. This means I can
       * still display things that depend on my current value while my new
       * value is loading.
       */
      value: Value | undefined
      /**
       * Errors get reset each time we leave the error state. There's really
       * no use in keeping those around. They go stale once we leave.
       */
      error: undefined
    }
  | {
      id: number
      status: 'success'
      value: Value
      error: undefined
    }
  | {
      id: number
      status: 'error'
      value: Value | undefined
      error: ErrorType
    }
  | {
      id: number
      status: 'cancelled'
      value: Value | undefined
      error: undefined
    }

export type CacheExport<Value = any, ErrorType = Error> = {
  [key: string]: CacheState<Value, ErrorType>
}

type CacheAction<Value = any, ErrorType = Error> =
  | {
      id: number
      key: string
      status: 'loading'
    }
  | {
      key: string
      status: 'cancelled'
    }
  | {
      id: number
      key: string
      status: 'success'
      value: Value
    }
  | {
      id: number
      key: string
      status: 'error'
      error: ErrorType
    }

export type CacheStatus = 'loading' | 'success' | 'error' | 'cancelled'
export type UseCacheStatus = 'idle' | CacheStatus
export type UseCacheState<Value = any, ErrorType = Error> =
  | {
      status: 'idle'
      value: undefined
      error: undefined
      cancel: () => void
    }
  | {
      status: 'loading' | 'cancelled'
      value: Value | undefined
      error: undefined
      cancel: () => void
    }
  | {
      status: 'success'
      value: Value
      error: undefined
      cancel: () => void
    }
  | {
      status: 'error'
      value: Value | undefined
      error: ErrorType
      cancel: () => void
    }
  | {
      status: 'cancelled'
      value: Value | undefined
      error: undefined
      cancel: () => void
    }

export interface CacheSubscribeCallback<Value = any> {
  (value: Value): void
}

export const useCache = <Value = any, ErrorType = Error>(
  cache: Cache<Value, ErrorType>,
  key: string,
  ...args: any[]
): [
  UseCacheState<Value, ErrorType>,
  () => Promise<CacheState<Value, ErrorType>>
] => {
  const [state, setState] = useState<{
    key: string
    cache: Cache<Value, ErrorType>
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
        const stateToReturn = Object.assign({cancel}, state.current)
        delete stateToReturn.id
        return stateToReturn
      }
    }, [state, key, cache]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => cache.load(key, ...args), args.concat([key, cache])),
  ]
}
