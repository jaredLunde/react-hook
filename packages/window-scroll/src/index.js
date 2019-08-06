import {useEffect} from 'react'
import emptyArr from 'empty/array'
import {useThrottle} from '@react-hook/throttle'


const getScrollY = () =>
  window.scrollY !== void 0
    ? window.scrollY
    : window.pageYOffset === void 0
      ? 0
      : window.pageYOffset

export default (fps = 30) => {
  const [scrollY, setThrottledScroll] = useThrottle(
    typeof window === 'undefined' ? 0 : getScrollY,
    fps,
    true
  )

  useEffect(
    () => {
      const handleScroll = () => setThrottledScroll(getScrollY())
      window.addEventListener('scroll', handleScroll)
      return () => { window.removeEventListener('scroll', handleScroll) }
    },
    emptyArr
  )

  return scrollY
}
