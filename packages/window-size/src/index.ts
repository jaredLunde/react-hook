import {useEffect} from 'react'
import useDebounce from '@react-hook/debounce'

const emptyArr = []
const emptyObj = {}

export interface DebounceOptions {
  wait?: number
  leading?: boolean
}

export const useWindowSize = (
  initialWidth?: number,
  initialHeight?: number,
  options: DebounceOptions = emptyObj
): [number, number] => {
  const {wait, leading} = options
  const [size, setDebouncedSize] = useDebounce(
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
  initialValue = 0,
  options?: DebounceOptions
): number => useWindowSize(0, initialValue, options)[1]

export const useWindowWidth = (
  initialValue = 0,
  options?: DebounceOptions
): number => useWindowSize(initialValue, 0, options)[0]

export default useWindowSize
