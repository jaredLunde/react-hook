import {useEffect, useCallback, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


export const useThrottleCallback = (fn, fps = 30, leading = false) => {
  const
    nextTimeout = useRef(null),
    tailTimeout = useRef(null),
    calledLeading = useRef(false),
    wait = 1000 / fps
  
  const next = useCallback(
    (this_, args) => {
      nextTimeout.current = null
      tailTimeout.current === null && (calledLeading.current = false)
      fn.apply(this_, args)
    },
    [fn]
  )

  const tail = useCallback(
    (this_, args) => {
      tailTimeout.current = null
      calledLeading.current = false
      nextTimeout.current === null && fn.apply(this_, args)
    },
    [fn]
  )

  // cleans up pending timeouts on unmount
  useEffect(
    () => () => {
      nextTimeout.current !== null && clearRequestTimeout(nextTimeout.current)
      tailTimeout.current !== null && clearRequestTimeout(tailTimeout.current)
    }
  )

  return useCallback(
    function () {
      const this_ = this
      const args = arguments

      if (nextTimeout.current === null) {
        if (leading === true && calledLeading.current === false) {
          next(this_, args)
          calledLeading.current = true
        }

        nextTimeout.current = requestTimeout(() => next(this_, args), wait)
      }
      else {
        tailTimeout.current !== null && clearRequestTimeout(tailTimeout.current)
        tailTimeout.current = requestTimeout(() => tail(this_, args), wait)
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