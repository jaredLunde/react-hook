import {useCallback, useState, useEffect, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


export const useDebounceCallback = (fn, wait = 100, immediate = true) => {
  const timeout = useRef(null)

  const next = useCallback(
    args => {
      fn.apply(this, args)
      timeout.current = null
    },
    [fn]
  )

  return useCallback(
    function () {
      if (timeout.current === null && immediate === true) {
        next(arguments)
      }
      else if (timeout.current !== null) {
        clearRequestTimeout(timeout.current)
      }

      timeout.current = requestTimeout(() => next(arguments), wait)
      return () => timeout.current !== null && clearRequestTimeout(timeout.current)
    },
    [next, wait]
  )
}

export const useDebounce = (initialState, wait, immediate) => {
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, immediate)]
}

export default useDebounce