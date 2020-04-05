import {useReducer, useMemo, useRef, useEffect, useCallback} from 'react'

export function useAsync<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies: any[] = []
): [
  AsyncState<PromiseReturnType, ErrorType>,
  AsyncCallback<PromiseReturnType>
] {
  const [state, dispatch_] = useReducer(
    function asyncCallbackReducer(
      prev: AsyncReducerState<PromiseReturnType, ErrorType>,
      action: AsyncAction<PromiseReturnType, ErrorType>
    ) {
      switch (action.status) {
        case 'idle':
        case 'loading':
        case 'cancelled':
          return {status: action.status, value: undefined, error: undefined}
        case 'error':
          return {status: action.status, value: undefined, error: action.error}
        case 'success':
          return {status: action.status, value: action.value, error: undefined}
      }
    },
    {
      status: 'idle',
      value: undefined,
      error: undefined,
    }
  )
  const cancelled = useRef<boolean>(false)
  function dispatch(action: AsyncAction<PromiseReturnType, ErrorType>) {
    !cancelled.current && dispatch_(action)
  }

  // Cancel any pending async stuff on unmount
  useEffect(
    () => () => {
      cancelled.current = true
    },
    []
  )

  const callback = useCallback(
    async (...args: any[]) => {
      dispatch({status: 'loading'})

      try {
        const value = await asyncCallback(...args)
        dispatch({status: 'success', value})
        return value
      } catch (error) {
        dispatch({status: 'error', error})
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )

  return [
    useMemo(
      () => ({
        ...state,
        cancel: () => {
          cancelled.current = true
          dispatch({status: 'cancelled'})
        },
      }),
      [state]
    ),
    callback,
  ]
}

export function useAsyncEffect<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies: any[] = []
): AsyncState<PromiseReturnType, ErrorType> {
  const [state, callback] = useAsync<PromiseReturnType, ErrorType>(
    asyncCallback,
    dependencies
  )

  useEffect(
    () => {
      callback()
      return () => state.cancel()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )

  return state
}

export interface AsyncReducerState<ValueType, ErrorType> {
  status: AsyncStatus
  value?: ValueType
  error?: ErrorType
}

export interface AsyncState<ValueType, ErrorType>
  extends AsyncReducerState<ValueType, ErrorType> {
  cancel: () => void
}

export type AsyncAction<ValueType, ErrorType> =
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

export interface AsyncCallback<PromiseReturnType> {
  (...args: any[]): Promise<PromiseReturnType | undefined>
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled'
