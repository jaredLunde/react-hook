import {useCallback, useEffect, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'


export const useDebounceCallback = (fn, wait = 100, leading = false) => {
  const timeout = useRef(null)
  const next = useCallback(
    (this_, args) => {
      timeout.current = null
      leading !== true && fn.apply(this_, args)
    },
    [fn]
  )

  // cleans up pending timeouts when the function chagnes
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
    function () {
      const this_ = this
      const args = arguments

      if (timeout.current === null && leading === true) {
        fn.apply(this_, args)
      }
      else if (timeout.current !== null) {
        clearRequestTimeout(timeout.current)
      }

      timeout.current = requestTimeout(() => next(this_, args), wait)
    },
    [fn, wait]
  )
}

export const useDebounce = (initialState, wait, leading) => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}

export default useDebounce