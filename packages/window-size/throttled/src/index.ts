import useThrottle from '@react-hook/throttle'
import useEvent from '@react-hook/event'

const emptyObj = {}

export interface ThrottledWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  fps?: number
  leading?: boolean
}

export const useWindowSize = (
  options: ThrottledWindowSizeOptions = emptyObj
): [number, number] => {
  const {fps, leading, initialWidth = 0, initialHeight = 0} = options
  const [size, setThrottledSize] = useThrottle<[number, number]>(
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
  const setSize = (): void =>
    setThrottledSize([
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
    ])

  useEvent(window, 'resize', setSize)
  useEvent(window, 'orientationchange', setSize)

  return size
}

export const useWindowHeight = (
  options?: Omit<ThrottledWindowSizeOptions, 'initialWidth'>
): number => useWindowSize(options)[1]

export const useWindowWidth = (
  options?: Omit<ThrottledWindowSizeOptions, 'initialWidth'>
): number => useWindowSize(options)[0]

export default useWindowSize
