import * as React from 'react'
export declare function useAsync<
  ValueType extends any = any,
  ErrorType extends any = Error,
  Args extends any[] = any[]
>(
  asyncCallback: (...args: Args) => Promise<ValueType>
): readonly [
  {
    status: AsyncStatus
    value: ValueType | undefined
    error: ErrorType | undefined
    cancel: () => void
  },
  ((...args: Args) => Promise<void>) & {
    cancel: () => void
  }
]
export declare function useAsyncEffect<
  ValueType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: () => Promise<ValueType>,
  dependencies?: React.DependencyList
): {
  status: AsyncStatus
  value: ValueType | undefined
  error: ErrorType | undefined
  cancel: () => void
}
export interface AsyncReducerState<ValueType, ErrorType> {
  status: AsyncStatus
  value?: ValueType
  error?: ErrorType
}
export declare type AsyncAction<ValueType, ErrorType> =
  | {
      status: 'idle' | 'loading' | 'cancelled'
    }
  | {
      status: 'success'
      value: ValueType
    }
  | {
      status: 'error'
      error?: ErrorType
    }
export declare type AsyncStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'cancelled'
