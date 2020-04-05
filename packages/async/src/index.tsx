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
      id: action.status === 'cancelled' ? ++prev.id : prev.id,
    }),
    {
      status: 'idle',
      value: void 0,
      error: void 0,
      // The id is used for invalidating callbacks when they're cancelled and
      // preventing race conditions by keeping the cancelled state local to the
      // individual callback
      id: 0,
    }
  )

  // Creates a stable callback that manages our loading/success/error status updates
  // as the callback is invoked. This callback will not dispatch state once its been
  // invalidated.
  const callback = useCallbackOne<AsyncCallback>(
    Object.assign(
      async (...args: any[]) => {
        dispatch({status: 'loading'})

        try {
          const value = await asyncCallback(...args)
          !callback.cancelled && dispatch({status: 'success', value})
        } catch (error) {
          !callback.cancelled && dispatch({status: 'error', error})
        }
      },
      {
        cancelled: false,
      }
    ),
    // Makes sure changing the id (happens when cancel() is invoked) always invalidates
    // the current callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies.concat(state.id)
  )

  // Cancels any pending async stuff when the callback is invalidated or the hook
  // is unmounted
  useEffect(
    () => () => {
      callback.cancelled = true
    },
    [callback]
  )

  return [
    useMemoOne(
      () => ({
        status: state.status,
        value: state.value,
        error: state.error,
        cancel: () => dispatch({status: 'cancelled'}),
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )

  return state
}

export interface AsyncReducerState<ValueType, ErrorType> {
  id: number
  status: AsyncStatus
  value?: ValueType
  error?: ErrorType
}

export interface AsyncState<ValueType, ErrorType>
  extends Omit<AsyncReducerState<ValueType, ErrorType>, 'id'> {
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
