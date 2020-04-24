import {
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'

export const useDebounceCallback = <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait = 100,
  leading = false
): ((...args: CallbackArgs) => void) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(void 0)
  const deps = [callback, wait, leading]
  // Cleans up pending timeouts when the deps change
  useEffect(
    () => () => {
      clearTimeout(timeout.current)
      timeout.current = void 0
    },
    deps
  )

  return useCallback(function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    const current = timeout.current
    // Calls on leading edge
    if (current === void 0 && leading) callback.apply(self, args)
    // Clear the timeout every call and start waiting again
    else if (current !== void 0) clearTimeout(current)
    // Waits for `wait` before invoking the callback
    timeout.current = setTimeout(() => {
      timeout.current = void 0
      callback.apply(self, args)
    }, wait)
  }, deps)
}

export const useDebounce = <State>(
  initialState: State | (() => State),
  wait?: number,
  leading?: boolean
): [State, Dispatch<SetStateAction<State>>] => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}

export default useDebounce
