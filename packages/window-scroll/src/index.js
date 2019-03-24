import {useEffect} from 'react'
import emptyArr from 'empty/array'
import emptyObj from 'empty/object'
import defaultUseThrottle from '@react-hook/throttle'


const getScrollY = () =>
  window.scrollY !== void 0
    ? window.scrollY
    : window.pageYOffset === void 0
    ? 0
    : window.pageYOffset

export default (initialValue = 0, opt = emptyObj) => {
  const {fps, useThrottle = defaultUseThrottle} = opt
  const [scrollY, setThrottledScroll] = useThrottle(
    typeof window === 'undefined' ? initialValue : getScrollY(),
    fps
  )

  useEffect(
    () => {
      const handleScroll = () => setThrottledScroll(getScrollY())

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    },
    emptyArr
  )

  return scrollY
}
