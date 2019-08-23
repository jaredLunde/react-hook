import {useEffect} from 'react'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import useDebounce from '@react-hook/debounce'


const useSizeHook = (dim, initialValue, opt) => {
  const {wait, leading} = opt
  const [size, setDebouncedSize] = useDebounce(
    typeof document === 'undefined' ? initialValue : document.documentElement[dim],
    wait,
    leading
  )

  useEffect(
    () => {
      const setSize = () => setDebouncedSize(document.documentElement[dim])
      window.addEventListener('resize', setSize)
      window.addEventListener('orientationchange', setSize)

      return () => {
        window.removeEventListener('resize', setSize)
        window.removeEventListener('orientationchange', setSize)
      }
    },
    emptyArr
  )

  return size
}

export const useWindowHeight = (initialValue = 0, opt = emptyObj) =>
  useSizeHook('clientHeight', initialValue, opt)

export const useWindowWidth = (initialValue = 0, opt = emptyObj) =>
  useSizeHook('clientWidth', initialValue, opt)

export const useWindowSize = (initialWidth, initialHeight, opt) => ([
  useWindowWidth(initialWidth, opt),
  useWindowHeight(initialHeight, opt)
])

export default useWindowSize