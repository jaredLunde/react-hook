import {useEffect} from 'react'
import useThrottle from '@react-hook/throttle'

const emptyArr = []
const emptyObj = {}
type Dimension = 'clientWidth' | 'clientHeight'

export interface ThrottleOptions {
  fps?: number
  leading?: boolean
}

const useSizeHook = (
  dim: Dimension,
  initialValue?: number,
  options: ThrottleOptions = emptyObj
): number => {
  const {fps, leading} = options
  const [size, setThrottledSize] = useThrottle(
    typeof document === 'undefined'
      ? initialValue
      : document.documentElement[dim],
    fps,
    leading
  )

  useEffect(() => {
    const setSize = (): void => setThrottledSize(document.documentElement[dim])
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
): number => useSizeHook('clientHeight', initialValue, options)

export const useWindowWidth = (
  initialValue = 0,
  options?: ThrottleOptions
): number => useSizeHook('clientWidth', initialValue, options)

export const useWindowSize = (
  initialWidth?: number,
  initialHeight?: number,
  options?: ThrottleOptions
): [number, number] => [
  useWindowWidth(initialWidth, options),
  useWindowHeight(initialHeight, options),
]

export default useWindowSize
