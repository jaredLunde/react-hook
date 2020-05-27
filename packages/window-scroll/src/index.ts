import {useThrottle} from '@react-hook/throttle'
import useEvent from '@react-hook/event'

const getScrollY = (): number =>
  window.scrollY !== void 0
    ? window.scrollY
    : window.pageYOffset === void 0
    ? 0
    : window.pageYOffset

const win = typeof window === 'undefined' ? null : window

export const useWindowScroll = (fps = 30): number => {
  const [scrollY, setThrottledScroll] = useThrottle(
    typeof window === 'undefined' ? 0 : getScrollY,
    fps,
    true
  )
  useEvent(win, 'scroll', (): void => setThrottledScroll(getScrollY()))
  return scrollY
}

export default useWindowScroll
