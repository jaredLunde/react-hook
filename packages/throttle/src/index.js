import {useCallback, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


export const useThrottleCallback = (fn, fps = 30, leading = false) => {
  const
    nextTimeout = useRef(null),
    tailTimeout = useRef(null),
    calledLeading = useRef(false),
    wait = 1000 / fps
  
  const next = useCallback(
    (args, this_) => {
      nextTimeout.current = null
      tailTimeout.current === null && (calledLeading.current = false)
      fn.apply(this_, args)
    },
    [fn]
  )
  const tail = useCallback(
    (args, this_) => {
      tailTimeout.current = null
      calledLeading.current = false
      nextTimeout.current === null && fn.apply(this_, args)
    },
    [fn]
  )

  return useCallback(
    function () {
      const this_ = this

      if (nextTimeout.current === null) {
        if (leading === true && calledLeading.current === false) {
          next(arguments, this_)
          calledLeading.current = true
        }

        nextTimeout.current = requestTimeout(() => next(arguments, this_), wait)
      }
      else {
        tailTimeout.current !== null && clearRequestTimeout(tailTimeout.current)
        tailTimeout.current = requestTimeout(() => tail(arguments, this_), wait)
      }

      return () => {
        nextTimeout.current !== null && clearRequestTimeout(nextTimeout.current)
        tailTimeout.current !== null && clearRequestTimeout(tailTimeout.current)
      }
    },
    [next, fps]
  )
}

export const useThrottle = (initialState, fps, leading) => {
  const [state, setState] = useState(initialState)
  return [state, useThrottleCallback(setState, fps, leading)]
}

export default useThrottle