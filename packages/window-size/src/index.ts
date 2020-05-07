import {useEffect} from 'react'
import useDebounce from '@react-hook/debounce'

const emptyArr: [] = []
const emptyObj = {}

export interface DebouncedWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  wait?: number
  leading?: boolean
}

export const useWindowSize = (
  options: DebouncedWindowSizeOptions = emptyObj
): [number, number] => {
  const {wait, leading, initialWidth = 0, initialHeight = 0} = options
  const [size, setDebouncedSize] = useDebounce<[number, number]>(
    /* istanbul ignore next */
    typeof document === 'undefined'
      ? [initialWidth, initialHeight]
      : [
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ],
    wait,
    leading
  )

  useEffect(() => {
    const setSize = (): void =>
      setDebouncedSize([
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
  options?: Omit<DebouncedWindowSizeOptions, 'initialWidth'>
): number => useWindowSize(options)[1]

export const useWindowWidth = (
  options?: Omit<DebouncedWindowSizeOptions, 'initialHeight'>
): number => useWindowSize(options)[0]

export default useWindowSize
