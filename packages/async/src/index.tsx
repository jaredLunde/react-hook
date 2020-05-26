import * as React from 'react'

export const useAsync = <
  ValueType extends any = any,
  ErrorType extends any = Error,
  Args extends any[] = any[]
>(
  asyncCallback: (...args: Args) => Promise<ValueType>
): [AsyncState<ValueType, ErrorType, Args>, AsyncCallback<Args>] => {
  // Creates a stable callback that manages our loading/success/error status updates
  // as the callback is invoked.
  const storedCallback = React.useRef(asyncCallback)
  storedCallback.current = asyncCallback

  const createCallback = () => {
    // This callback will not dispatch state once its been cancelled
    let cancelled = false
    const callback = Object.assign(
      async (...args: Args) => {
        dispatch({status: 'loading'})

        try {
          const value = await storedCallback.current(...args)
          !cancelled && dispatch({status: 'success', value})
        } catch (error) {
          !cancelled && dispatch({status: 'error', error})
        }
      },
      {
        cancel: () => (cancelled = true),
      }
    )

    return callback
  }

  const [state, dispatch] = React.useReducer<
    React.Reducer<
      AsyncReducerState<ValueType, ErrorType, Args>,
      AsyncAction<ValueType, ErrorType>
    >,
    undefined
  >(
    (prev, action) => ({
      // This is the current status of the promise or async/await function. A
      // promise or async/await can only be in one state at a time.
      status: action.status,
      // The value is persisted between 'success' statuses. This means I can
      // still display things that depend on my current value while my new
      // value is loading.
      value: action.status === 'success' ? action.value : prev.value,
      // Errors get reset each time we leave the error state. There's really
      // no use in keeping those around. They go stale once we leave.
      error: action.status === 'error' ? action.error : void 0,
      callback:
        action.status === 'cancelled' ? createCallback() : prev.callback,
    }),
    void 0,
    () => ({
      status: 'idle',
      value: void 0,
      error: void 0,
      callback: createCallback(),
    })
  )

  // Cancels any pending async callbacks when the hook unmounts
  React.useEffect(() => state.callback.cancel, [state.callback])

  return [
    React.useMemo(
      () => ({
        status: state.status,
        value: state.value,
        error: state.error,
        cancel: () => {
          // Prevent the callback from dispatching
          state.callback.cancel()
          // Create a new callback and set status to cancelled
          dispatch({status: 'cancelled'})
        },
      }),
      [state]
    ),
    state.callback,
  ]
}

export const useAsyncEffect = <
  ValueType extends any = any,
  ErrorType extends any = Error
>(
  asyncCallback: () => Promise<ValueType>,
  dependencies?: React.DependencyList
): AsyncState<ValueType, ErrorType, []> => {
  const [state, callback] = useAsync<ValueType, ErrorType>(asyncCallback)
  // Cancels the current callback and creates a new callback each time the
  // dependencies change
  React.useEffect(
    () => state.cancel,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  )
  // Runs the callback each time we receive a new one
  React.useEffect(() => {
    callback()
  }, [callback])

  return state
}

export interface AsyncReducerState<
  ValueType,
  ErrorType,
  Args extends any[] = any[]
> {
  status: AsyncStatus
  value?: ValueType
  error?: ErrorType
  callback: AsyncCallback<Args>
}

export interface AsyncState<ValueType, ErrorType, Args extends any[] = any[]>
  extends Omit<AsyncReducerState<ValueType, ErrorType, Args>, 'callback'> {
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

export interface AsyncCallback<Args extends any[] = any[]> {
  (...args: Args): void
  cancel: () => void
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled'
