import {useEffect, useCallback, useState, useRef} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'

export const useThrottleCallback = (
  callback: Function,
  fps = 30,
  leading = false
): Function => {
  const nextTimeout = useRef(null),
    tailTimeout = useRef(null),
    calledLeading = useRef(false),
    wait = 1000 / fps

  // cleans up pending timeouts when the function changes
  useEffect(
    () => (): void => {
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
    [callback, fps]
  )

  return useCallback(
    function() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this,
        // eslint-disable-next-line prefer-rest-params
        args = arguments

      if (nextTimeout.current === null) {
        const next = (): void => {
          nextTimeout.current = null
          tailTimeout.current === null && (calledLeading.current = false)
          callback.apply(self, args)
        }

        if (leading && calledLeading.current === false) {
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
        tailTimeout.current = requestTimeout((): void => {
          tailTimeout.current = null
          calledLeading.current = false
          nextTimeout.current === null && callback.apply(self, args)
        }, wait)
      }
    },
    [callback, fps]
  )
}

export const useThrottle = (
  initialState: any,
  fps?: number,
  leading?: boolean
): any[] => {
  const [state, setState] = useState(initialState)
  return [state, useThrottleCallback(setState, fps, leading)]
}

export default useThrottle
