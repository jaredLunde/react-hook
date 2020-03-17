import {
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  requestTimeout,
  clearRequestTimeout,
  RequestTimeoutHandle,
} from '@essentials/request-timeout'

export interface DebounceOptions {
  wait?: number
  leading?: boolean
}
export const useDebounceCallback = <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => any,
  options: DebounceOptions = {},
): ((...args: CallbackArgs) => void) => {
  const {leading = false, wait = 100} = options
  const timeout = useRef<RequestTimeoutHandle | null>(null)

  // cleans up pending timeouts when the function changes
  useEffect(
    () => (): void => {
      if (timeout.current !== null) {
        clearRequestTimeout(timeout.current)
        timeout.current = null
      }
    },
    [callback, wait]
  )

  return useCallback(
    function(...args) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this

      if (timeout.current === null && leading) callback.apply(self, args)
      else if (timeout.current !== null) clearRequestTimeout(timeout.current)

      timeout.current = requestTimeout(() => {
        timeout.current = null
        !leading && callback.apply(self, args)
      }, wait)
    },
    [callback, wait]
  )
}

export const useDebounce = <State>(
  initialState: State | (() => State),
  options: DebounceOptions = {},
): [State, Dispatch<SetStateAction<State>>] => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, options)]
}

export default useDebounce
