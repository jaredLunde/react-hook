import {useDebounce} from '@react-hook/debounce'
import useEvent from '@react-hook/event'

const emptyObj = {}

export interface DebouncedWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  wait?: number
  leading?: boolean
}

const win = typeof window === 'undefined' ? null : window
const wv =
  win && typeof win.visualViewport !== 'undefined' ? win.visualViewport : null
const getSize = () =>
  [
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ] as const

export const useWindowSize = (
  options: DebouncedWindowSizeOptions = emptyObj
): readonly [number, number] => {
  const {wait, leading, initialWidth = 0, initialHeight = 0} = options
  const [size, setDebouncedSize] = useDebounce<readonly [number, number]>(
    /* istanbul ignore next */
    typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize,
    wait,
    leading
  )
  const setSize = (): void => setDebouncedSize(getSize)

  useEvent(win, 'resize', setSize)
  // @ts-expect-error
  useEvent(wv, 'resize', setSize)
  useEvent(win, 'orientationchange', setSize)

  return size
}

export const useWindowHeight = (
  options?: Omit<DebouncedWindowSizeOptions, 'initialWidth'>
): number => useWindowSize(options)[1]

export const useWindowWidth = (
  options?: Omit<DebouncedWindowSizeOptions, 'initialHeight'>
): number => useWindowSize(options)[0]
