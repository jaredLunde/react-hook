export declare const createCache: <Value = any, ErrorType = Error>(
  resolve: (key: string, ...args: any[]) => Promise<Value>,
  lruSize?: number
) => Cache<Value, ErrorType>
export declare type Cache<Value = any, ErrorType = Error> = {
  load: (key: string, ...args: any[]) => Promise<CacheState<Value, ErrorType>>
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
export declare type CacheState<Value = any, ErrorType = Error> =
  | {
      id: number
      status: 'loading' | 'cancelled'
      value: Value | undefined
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
export declare type CacheStatus = 'loading' | 'success' | 'error' | 'cancelled'
export declare type UseCacheStatus = 'idle' | CacheStatus
export declare type UseCacheState<Value = any, ErrorType = Error> =
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
export declare const useCache: <Value = any, ErrorType = Error>(
  cache: Cache<Value, ErrorType>,
  key: string,
  ...args: any[]
) => [
  UseCacheState<Value, ErrorType>,
  () => Promise<CacheState<Value, ErrorType>>
]
