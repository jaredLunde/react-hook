import {renderHook, act} from '@testing-library/react-hooks'
import useWindowScroll from './index'

const renderWindowScroll = (...args): any =>
  renderHook(() => useWindowScroll(...args))
const scrollEvent = document.createEvent('Event')
scrollEvent.initEvent('scroll', true, true)
const scrollTo = (value): void => {
  Object.defineProperty(window, 'scrollY', {value, configurable: true})
  window.dispatchEvent(scrollEvent)
}
const resetScroll = (): void => {
  scrollTo(0)
}

jest.useFakeTimers()

describe('useWindowScroll()', () => {
  beforeEach(() => {
    resetScroll()
  })

  it('should record scroll position correctly', () => {
    const {result} = renderWindowScroll()
    act(() => scrollTo(1)) // fires leading
    expect(result.current).toBe(1)

    for (let i = 0; i < 60; i++) {
      act(() => scrollTo(Math.random()))
    }

    act(() => scrollTo(1280))
    expect(result.current).toBe(1)
    act(() => jest.advanceTimersByTime(1000 / 30))
    expect(result.current).toBe(1280)
  })
})
