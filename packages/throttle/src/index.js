import {useCallback, useState, useEffect, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


export const useThrottleCallback = (fn, fps = 30, immediate = true) => {
  const timeout = useRef(null),
    endTimeout = useRef(null),
    usedImmediate = useRef(false),
    wait = 1000 / fps

  const next = useCallback(
    function (args) {
      fn.apply(this, args)
      timeout.current = null
    },
    [fn]
  )

  const endNext = useCallback(
    args => {
      if (timeout.current === null) {
        fn.apply(this, args)
        usedImmediate.current = false
      }

      endTimeout.current = null
    },
    [fn]
  )

  return useCallback(
    function () {
      if (timeout.current === null) {
        if (immediate === true && usedImmediate.current === false) {
          next(arguments)
          usedImmediate.current = true
        }

        timeout.current = requestTimeout(() => next(arguments), wait)
      }
      else {
        endTimeout.current !== null && clearRequestTimeout(endTimeout.current)
        endTimeout.current = requestTimeout(() => endNext(arguments), wait)
      }

      return () => {
        timeout.current !== null && clearRequestTimeout(timeout.current)
        endTimeout.current !== null && clearRequestTimeout(endTimeout.current)
      }
    },
    [next, fps]
  )
}

export const useThrottle = (initialState, fps, immediate) => {
  const [state, setState] = useState(initialState)
  return [state, useThrottleCallback(setState, fps, immediate)]
}

export default useThrottle