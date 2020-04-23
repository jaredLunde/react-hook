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
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // cleans up pending timeouts when the function changes
  useEffect(
    () => (): void => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current)
        timeout.current = null
      }
    },
    [callback, wait]
  )

  return useCallback(
    function() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      // eslint-disable-next-line prefer-rest-params
      const args = arguments

      if (timeout.current === null && leading) callback.apply(self, args)
      else if (timeout.current !== null) clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        timeout.current = null
        !leading && callback.apply(self, args)
      }, wait)
    },
    [callback, wait]
  )
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
