import * as React from 'react'
export declare const useAsync: <
  ValueType extends unknown = any,
  ErrorType extends unknown = Error,
  Args extends any[] = any[]
>(
  asyncCallback: (...args: Args) => Promise<ValueType>
) => [AsyncState<ValueType, ErrorType, Args>, AsyncCallback<Args>]
export declare const useAsyncEffect: <
  ValueType extends unknown = any,
  ErrorType extends unknown = Error
>(
  asyncCallback: () => Promise<ValueType>,
  dependencies?: React.DependencyList | undefined
) => AsyncState<ValueType, ErrorType, []>
export interface AsyncReducerState<ValueType, ErrorType> {
  status: AsyncStatus
  value?: ValueType
  error?: ErrorType
}
export interface AsyncState<ValueType, ErrorType, Args extends any[] = any[]>
  extends AsyncReducerState<ValueType, ErrorType> {
  cancel: () => void
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
export interface AsyncCallback<Args extends any[] = any[]> {
  (...args: Args): void
  cancel: () => void
}
export declare type AsyncStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'cancelled'
