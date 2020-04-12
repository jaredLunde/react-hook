import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one'
import {useSubscription} from 'use-subscription'
import {lru, LRUCache} from './lru'

// Cache does the promise resolution. Hooks subscribe to their cache by key.
export const createCache = <Value = any, ErrorType = Error>(
  resolve: (key: string, ...args: any[]) => Promise<Value>,
  lruSize = 1000
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
  load: (key: string, ...args: any[]) => Promise<CacheState<Value, ErrorType>>
  read: (key: string) => CacheState<Value, ErrorType> | undefined
  cancel: (key: string) => void
  readAll: () => CacheExport<CacheState<Value, ErrorType>>
  write: (input: CacheExport<Value, ErrorType>) => void
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
  const deps = [key, cache]
  const cacheState = useSubscription<CacheState<Value, ErrorType> | undefined>({
    getCurrentValue: useCallback(() => cache.read(key), deps),
    subscribe: useCallback((callback) => {
      cache.subscribe(key, callback)
      return () => cache.unsubscribe(key, callback)
    }, deps),
  })

  return [
    useMemo<UseCacheState<Value, ErrorType>>(() => {
      const cancel = () => cache.cancel(key)
      if (!cacheState) {
        return {
          status: 'idle',
          value: undefined,
          error: undefined,
          cancel,
        }
      } else {
        const state = Object.assign({cancel}, cacheState)
        delete state.id
        return state
      }
    }, [cacheState, key, cache]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => cache.load(key, ...args), [
      key,
      cache,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...args,
    ]),
  ]
}
