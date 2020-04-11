import {useEffect, useState} from 'react'
import {useCallbackOne as useCallback} from 'use-memo-one'
import {lru, LRUCache} from './lru'

// Cache does the promise resolution. Hooks subscribe to their cache by key.
export const createCache = <Value = any, ErrorType = Error>(
  resolve: (key: string, ...args: any[]) => Promise<Value>,
  options: {lruSize: number} = {lruSize: Infinity}
): Cache<Value, ErrorType> => {
  const cache = lru<string, CacheState<Value, ErrorType>>(options.lruSize)
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
      if (current.status === 'cancelled' || current.id > action.id)
        return current
      next = {
        id: action.id,
        status: action.status,
        value: action.value,
        error: void 0,
      }
    } else if (action.status === 'error') {
      // Bails out if the action has been cancelled
      if (current.status === 'cancelled' || current.id > action.id)
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
  load: (key: string) => Promise<CacheState<Value, ErrorType>>
  read: (key: string) => CacheState<Value, ErrorType> | undefined
  cancel: (key: string) => void
  subscribe: (
    key: string,
    callback: CacheSubscribeCallback<CacheState<Value, ErrorType>>
  ) => void
  unsubscribe: (
    key: string,
    callback: CacheSubscribeCallback<CacheState<Value, ErrorType>>
  ) => void
}

export type CacheState<Value = any, ErrorType = Error> =
  | {
      id: number
      // This is the current status of the promise or async/await function. A
      // promise or async/await can only be in one state at a time.
      status: 'loading' | 'cancelled'
      // The value is persisted between 'success' statuses. This means I can
      // still display things that depend on my current value while my new
      // value is loading.
      value: Value | undefined
      // Errors get reset each time we leave the error state. There's really
      // no use in keeping those around. They go stale once we leave.
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
  key: string
): [
  UseCacheState<Value, ErrorType>,
  () => Promise<CacheState<Value, ErrorType>>
] => {
  const load = useCallback(() => cache.load(key), [key, cache])
  const [state, setState] = useState<CacheState<Value, ErrorType> | undefined>(
    // Uses an init function because we don't want every render to affect
    // the LRU algorithm
    () => cache.read(key)
  )

  useEffect(() => {
    setState(cache.read(key))
    cache.subscribe(key, setState)
    return () => cache.unsubscribe(key, setState)
  }, [key, cache])

  const cancel = useCallback(() => cache.cancel(key), [key, cache])

  return [
    !state
      ? {
          status: 'idle',
          value: undefined,
          error: undefined,
          cancel,
        }
      : Object.assign({cancel}, state),
    load,
  ]
}

export const useCacheEffect = <
  ValueType extends any = any,
  ErrorType extends any = Error
>(
  cache: Cache<ValueType, ErrorType>,
  key: string,
  dependencies?: React.DependencyList
): UseCacheState<ValueType, ErrorType> => {
  const [state, callback] = useCache<ValueType, ErrorType>(cache, key)
  // Runs the callback each time the dependencies change and cancels any
  // pending callbacks that were running previously
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}
