/**
 * Creates an asynchronous LRU cache which can be used with the [`useCache()`](#usecache) hook.
 *  Cache keys _must_ be a `string` type.
 * @param resolve
 * @param lruSize
 */
export declare function createCache<
  Value = any,
  ErrorType = Error,
  Args extends any[] = []
>(
  resolve: (key: string, ...args: Args) => Promise<Value>,
  lruSize?: number
): Cache<Value, ErrorType, Args>
export declare type Cache<
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
export declare type CacheState<Value = any, ErrorType = Error> =
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
export declare type CacheExport<Value = any, ErrorType = Error> = Record<
  string,
  CacheState<Value, ErrorType>
>
export declare type CacheStatus = 'loading' | 'success' | 'error' | 'cancelled'
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
export declare function useCache<
  Value = any,
  ErrorType = Error,
  Args extends any[] = any[]
>(
  cache: Cache<Value, ErrorType, Args>,
  key: string,
  ...args: Args
): readonly [
  UseCacheState<Value, ErrorType>,
  () => Promise<CacheState<Value, ErrorType>>
]
export declare type UseCacheStatus = 'idle' | CacheStatus
export declare type UseCacheState<Value = any, ErrorType = Error> =
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
