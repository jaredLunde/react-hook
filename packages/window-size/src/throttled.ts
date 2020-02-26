import {useEffect} from 'react'
import useThrottle from '@react-hook/throttle'

const emptyArr = []
const emptyObj = {}

export interface ThrottleOptions {
  fps?: number
  leading?: boolean
}

export interface ThrottleOptions {
  wait?: number
  leading?: boolean
}

export const useWindowSize = (
  initialWidth?: number,
  initialHeight?: number,
  options: ThrottleOptions = emptyObj
): [number, number] => {
  const {fps, leading} = options
  const [size, setThrottledSize] = useThrottle(
    /* istanbul ignore next */
    typeof document === 'undefined'
      ? [initialWidth, initialHeight]
      : [
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ],
    fps,
    leading
  )

  useEffect(() => {
    const setSize = (): void =>
      setThrottledSize([
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ])
    window.addEventListener('resize', setSize)
    window.addEventListener('orientationchange', setSize)

    return (): void => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('orientationchange', setSize)
    }
  }, emptyArr)

  return size
}

export const useWindowHeight = (
  initialValue = 0,
  options?: ThrottleOptions
): number => useWindowSize(0, initialValue, options)[1]

export const useWindowWidth = (
  initialValue = 0,
  options?: ThrottleOptions
): number => useWindowSize(initialValue, 0, options)[0]

export default useWindowSize
