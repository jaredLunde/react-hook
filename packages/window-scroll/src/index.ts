import {useEffect} from 'react'
import {useThrottle} from '@react-hook/throttle'

const emptyArr: [] = []
const getScrollY = (): number =>
  window.scrollY !== void 0
    ? window.scrollY
    : window.pageYOffset === void 0
    ? 0
    : window.pageYOffset

export const useWindowScroll = (fps = 30): number => {
  const [scrollY, setThrottledScroll] = useThrottle(
    typeof window === 'undefined' ? 0 : getScrollY,
    fps,
    true
  )

  useEffect(() => {
    const handleScroll = (): void => setThrottledScroll(getScrollY())
    window.addEventListener('scroll', handleScroll)
    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, emptyArr)

  return scrollY
}

export default useWindowScroll
