import {useReducer, useMemo, useRef, useEffect, useCallback} from 'react'

export function useAsync<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies: any[] = []
): [AsyncState<PromiseReturnType, ErrorType>, AsyncCallback] {
  const cancelled = useRef<boolean>(false)
  const [state, dispatch_] = useReducer(
    (
      prev: AsyncReducerState<PromiseReturnType, ErrorType>,
      action: AsyncAction<PromiseReturnType, ErrorType>
    ) => ({
      status: action.status,
      value: action.status === 'success' ? action.value : void 0,
      error: action.status === 'error' ? action.error : void 0,
    }),
    {
      status: 'idle',
      value: void 0,
      error: void 0,
    }
  )
  const dispatch = (action: AsyncAction<PromiseReturnType, ErrorType>) =>
    !cancelled.current && dispatch_(action)

  // Cancel any pending async stuff on unmount
  useEffect(
    () => () => {
      cancelled.current = true
    },
    []
  )

  // Creates a stable callback that manages our loading/success/error status updates
  // as the callback is invoked.
  const callback = useCallback(
    async (...args: any[]) => {
      cancelled.current = false
      dispatch({status: 'loading'})

      try {
        dispatch({
          status: 'success',
          value: await asyncCallback(...args),
        })
      } catch (error) {
        dispatch({status: 'error', error})
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )

  return [
    useMemo(
      () =>
        Object.assign(
          {
            cancel: () => {
              dispatch({status: 'cancelled'})
              cancelled.current = true
            },
          },
          state
        ),
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
  dependencies?: any[]
): AsyncState<PromiseReturnType, ErrorType> {
  const [state, callback] = useAsync<PromiseReturnType, ErrorType>(
    asyncCallback,
    dependencies || [Math.random()]
  )
  // Runs the callback each time the dependencies change and cancels any
  // pending callbacks that were running previously
  useEffect(
    () => {
      callback()
      return state.cancel
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

export interface AsyncCallback {
  (...args: any[]): void
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled'
