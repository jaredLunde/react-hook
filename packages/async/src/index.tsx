import {useReducer, useEffect} from 'react'
import {useMemoOne, useCallbackOne} from 'use-memo-one'

export function useAsync<
  PromiseReturnType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: (...args: any[]) => Promise<PromiseReturnType>,
  dependencies: any[] = []
): [AsyncState<PromiseReturnType, ErrorType>, AsyncCallback] {
  const [state, dispatch] = useReducer(
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

  // Creates a stable callback that manages our loading/success/error status updates
  // as the callback is invoked.
  const callback = useCallbackOne<AsyncCallback>(
    Object.assign(
      async (...args: any[]) => {
        callback.cancelled = false
        dispatch({status: 'loading'})

        try {
          const value = await asyncCallback(...args)
          if (callback.cancelled) return
          dispatch({status: 'success', value})
        } catch (error) {
          if (callback.cancelled) return
          dispatch({status: 'error', error})
        }
      },
      {
        cancelled: false,
      }
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )

  // Cancel any pending async stuff on unmount
  useEffect(
    () => () => {
      callback.cancelled = true
    },
    [callback]
  )

  return [
    useMemoOne(
      () =>
        Object.assign(
          {
            cancel: () => {
              callback.cancelled = true
              dispatch({status: 'cancelled'})
            },
          },
          state
        ),
      [callback, state]
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
  cancelled: boolean
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled'
