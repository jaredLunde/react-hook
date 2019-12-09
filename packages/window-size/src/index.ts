import {useEffect} from 'react'
import useDebounce from '@react-hook/debounce'

const emptyArr = []
const emptyObj = {}
type Dimension = 'clientWidth' | 'clientHeight'

export interface DebounceOptions {
  wait?: number
  leading?: boolean
}

const useSizeHook = (
  dim: Dimension,
  initialValue?: number,
  options: DebounceOptions = emptyObj
): number => {
  const {wait, leading} = options
  const [size, setDebouncedSize] = useDebounce(
    typeof document === 'undefined'
      ? initialValue
      : document.documentElement[dim],
    wait,
    leading
  )

  useEffect(() => {
    const setSize = (): void => setDebouncedSize(document.documentElement[dim])
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
): number => useSizeHook('clientHeight', initialValue, options)

export const useWindowWidth = (
  initialValue = 0,
  options?: DebounceOptions
): number => useSizeHook('clientWidth', initialValue, options)

export const useWindowSize = (
  initialWidth?: number,
  initialHeight?: number,
  options?: DebounceOptions
): [number, number] => [
  useWindowWidth(initialWidth, options),
  useWindowHeight(initialHeight, options),
]

export default useWindowSize
