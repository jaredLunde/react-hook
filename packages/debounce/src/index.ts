import {useCallback, useEffect, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'

export const useDebounceCallback = (
  callback: Function,
  wait = 100,
  leading = false
): Function => {
  const timeout = useRef(null)

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
    function() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      // eslint-disable-next-line prefer-rest-params
      const args = arguments

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

export const useDebounce = (
  initialState: any,
  wait?: number,
  leading?: boolean
): any[] => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}

export default useDebounce
