/* eslint-disable import/no-extraneous-dependencies */
import {useThrottle} from '@react-hook/throttle'
import useEvent from '@react-hook/event'

const emptyObj = {}

export interface ThrottledWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  fps?: number
  leading?: boolean
}

const win = typeof window === 'undefined' ? null : window
const getSize = () =>
  [
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ] as const

export const useWindowSize = (
  options: ThrottledWindowSizeOptions = emptyObj
): readonly [number, number] => {
  const {fps, leading, initialWidth = 0, initialHeight = 0} = options
  const [size, setThrottledSize] = useThrottle<readonly [number, number]>(
    /* istanbul ignore next */
    typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize,
    fps,
    leading
  )
  const setSize = (): void => setThrottledSize(getSize)

  useEvent(win, 'resize', setSize)
  useEvent(win, 'orientationchange', setSize)

  return size
}

export const useWindowHeight = (
  options?: Omit<ThrottledWindowSizeOptions, 'initialWidth'>
): number => useWindowSize(options)[1]

export const useWindowWidth = (
  options?: Omit<ThrottledWindowSizeOptions, 'initialHeight'>
): number => useWindowSize(options)[0]
