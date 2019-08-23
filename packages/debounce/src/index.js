import {useCallback, useEffect, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'

export const useDebounceCallback = (fn, wait = 100, leading = false) => {
  const timeout = useRef(null)

  // cleans up pending timeouts when the function changes
  useEffect(
    () => () => {
      if (timeout.current !== null) {
        clearRequestTimeout(timeout.current)
        timeout.current = null
      }
    },
    [fn, wait]
  )

  return useCallback(
    function() {
      const this_ = this
      const args = arguments

      if (timeout.current === null && leading === true) fn.apply(this_, args)
      else if (timeout.current !== null) clearRequestTimeout(timeout.current)

      timeout.current = requestTimeout(() => {
        timeout.current = null
        leading !== true && fn.apply(this_, args)
      }, wait)
    },
    [fn, wait]
  )
}

export const useDebounce = (initialState, wait, leading) => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}

export default useDebounce
