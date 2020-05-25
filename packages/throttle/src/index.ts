import {
  useEffect,
  useCallback,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'

const perf = typeof performance !== 'undefined' ? performance : Date
const now = () => perf.now()

export const useThrottleCallback = <CallbackArguments extends any[]>(
  callback: (...args: CallbackArguments) => void,
  fps = 30,
  leading = false
): ((...args: CallbackArguments) => void) => {
  const storedCallback = useRef(callback)
  storedCallback.current = callback
  const wait = 1000 / fps
  const prev = useRef(0)
  const trailingTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    void 0
  )
  const clearTrailing = () => clearTimeout(trailingTimeout.current)
  const deps = [fps, leading]

  // Reset any time the deps change
  useEffect(
    () => () => {
      prev.current = 0
      clearTrailing()
    },
    deps
  )

  return useCallback(function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    const rightNow = now()
    const call = () => {
      prev.current = rightNow
      clearTrailing()
      // eslint-disable-next-line prefer-spread
      storedCallback.current.apply(null, args as any)
    }
    const current = prev.current
    // leading
    if (leading && current === 0) return call()
    // body
    if (rightNow - current > wait) {
      if (current > 0) return call()
      prev.current = rightNow
    }
    // trailing
    clearTrailing()
    trailingTimeout.current = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      storedCallback.current.apply(null, args as any)
      prev.current = 0
    }, wait)
  }, deps)
}

export const useThrottle = <State>(
  initialState: State | (() => State),
  fps?: number,
  leading?: boolean
): [State, Dispatch<SetStateAction<State>>] => {
  const ref = useState<State>(initialState)
  return [ref[0], useThrottleCallback(ref[1], fps, leading)]
}

export default useThrottle
