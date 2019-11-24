import {renderHook, act} from '@testing-library/react-hooks'
import useWindowScroll from './index'
import * as raf from 'raf'

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

describe('throttled scroll position', () => {
  beforeEach(() => {
    raf.reset()
    resetScroll()
  })

  test('scroll', () => {
    const {result} = renderWindowScroll()
    scrollTo(1) // fires leading
    expect(result.current).toBe(1)

    for (let i = 0; i < 60; i++) {
      act(() => scrollTo(Math.random()))
    }

    act(() => scrollTo(1280))
    expect(result.current).toBe(1)
    act(() => raf.step({count: 1, time: 1000 / 30}))
    expect(result.current).toBe(1280)
  })
})
