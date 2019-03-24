import {useEffect} from 'react'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import useDefaultDebounce from '@react-hook/debounce'


const useSizeHook = (dim, initialValue, opt) => {
  const {wait, immediate, useDebounce = useDefaultDebounce} = opt
  const [size, setThrottledSize] = useDebounce(
    typeof document === 'undefined' ? initialValue : document.documentElement[dim],
    wait,
    immediate
  )

  useEffect(
    () => {
      const setSize = () => setThrottledSize(document.documentElement[dim])
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

export const useViewportHeight = (initialValue = 0, opt = emptyObj) => {
  return useSizeHook('clientHeight', initialValue, opt)
}


export const useViewportWidth = (initialValue = 0, opt = emptyObj) => {
  return useSizeHook('clientWidth', initialValue, opt)
}

export default (initialWidth, initialHeight, opt) => ([
  useViewportWidth(initialWidth, opt),
  useViewportHeight(initialHeight, opt)
])
