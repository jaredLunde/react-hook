import {
  useEffect,
  useCallback,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'

export const useThrottleCallback = <CallbackArguments extends any[]>(
  callback: (...args: CallbackArguments) => void,
  fps = 30,
  leading = false
): ((...args: CallbackArguments) => void) => {
  const nextTimeout = useRef<ReturnType<typeof setTimeout> | null>(null),
    tailTimeout = useRef<ReturnType<typeof setTimeout> | null>(null),
    calledLeading = useRef<boolean>(false),
    wait = 1000 / fps

  // cleans up pending timeouts when the function changes
  useEffect(
    () => (): void => {
      if (nextTimeout.current !== null) {
        clearTimeout(nextTimeout.current)
        nextTimeout.current = null
      }

      if (tailTimeout.current !== null) {
        clearTimeout(tailTimeout.current)
        tailTimeout.current = null
      }

      calledLeading.current = false
    },
    [callback, fps]
  )

  return useCallback(
    function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      // eslint-disable-next-line prefer-rest-params
      const args = arguments

      if (nextTimeout.current === null) {
        const next = (): void => {
          nextTimeout.current = null
          tailTimeout.current === null && (calledLeading.current = false)
          callback.apply(self, args)
        }

        if (leading && !calledLeading.current) {
          // leading
          next()
          calledLeading.current = true
        } else {
          // head
          nextTimeout.current = setTimeout(next, wait)
        }
      } else {
        // tail
        tailTimeout.current !== null && clearTimeout(tailTimeout.current)
        tailTimeout.current = setTimeout((): void => {
          tailTimeout.current = null
          calledLeading.current = false
          nextTimeout.current === null && callback.apply(self, args)
        }, wait)
      }
    },
    [callback, fps]
  )
}

export const useThrottle = <State>(
  initialState: State | (() => State),
  fps?: number,
  leading?: boolean
): [State, Dispatch<SetStateAction<State>>] => {
  const [state, setState] = useState<State>(initialState)
  return [state, useThrottleCallback(setState, fps, leading)]
}

export default useThrottle
