import {useEffect, useCallback, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'

export const useThrottleCallback = (fn, fps = 30, leading = false) => {
  const nextTimeout = useRef(null),
    tailTimeout = useRef(null),
    calledLeading = useRef(false),
    wait = 1000 / fps

  // cleans up pending timeouts when the function changes
  useEffect(
    () => () => {
      if (nextTimeout.current !== null) {
        clearRequestTimeout(nextTimeout.current)
        nextTimeout.current = null
      }

      if (tailTimeout.current !== null) {
        clearRequestTimeout(tailTimeout.current)
        tailTimeout.current = null
      }

      calledLeading.current = false
    },
    [fn, fps]
  )

  return useCallback(
    function() {
      const this_ = this,
        args = arguments

      if (nextTimeout.current === null) {
        const next = () => {
          nextTimeout.current = null
          tailTimeout.current === null && (calledLeading.current = false)
          fn.apply(this_, args)
        }

        if (leading === true && calledLeading.current === false) {
          // leading
          next()
          calledLeading.current = true
        } else {
          // head
          nextTimeout.current = requestTimeout(next, wait)
        }
      } else {
        // tail
        tailTimeout.current !== null && clearRequestTimeout(tailTimeout.current)
        tailTimeout.current = requestTimeout(() => {
          tailTimeout.current = null
          calledLeading.current = false
          nextTimeout.current === null && fn.apply(this_, args)
        }, wait)
      }
    },
    [fn, fps]
  )
}

export const useThrottle = (initialState, fps, leading) => {
  const [state, setState] = useState(initialState)
  return [state, useThrottleCallback(setState, fps, leading)]
}

export default useThrottle
