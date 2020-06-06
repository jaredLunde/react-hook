import {renderHook, act} from '@testing-library/react-hooks'
import {resetSize, resizeTo, changeOrientation} from 'test-utils'
import {useWindowSize, useWindowWidth, useWindowHeight} from './index'
// @ts-ignore

const renderWindowSize = (...args): any =>
  renderHook(() => useWindowSize(...args))

const renderWindowWidth = (...args): any =>
  renderHook(() => useWindowWidth(...args))

const renderWindowHeight = (...args): any =>
  renderHook(() => useWindowHeight(...args))

const mockPerf = () => {
  // @ts-ignore
  const original = global?.performance
  let ts = (typeof performance !== 'undefined' ? performance : Date).now()

  return {
    install: () => {
      ts = Date.now()
      const perfNowStub = jest
        .spyOn(performance, 'now')
        .mockImplementation(() => ts)
      // @ts-ignore
      global.performance = {
        now: perfNowStub,
      }
    },
    advanceBy: (amt: number) => (ts += amt),
    advanceTo: (t: number) => (ts = t),
    uninstall: () => {
      if (original) {
        //@ts-ignore
        global.performance = original
      }
    },
  }
}

const perf = mockPerf()

describe('useWindowSize() throttled', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    perf.install()
    resetSize()
  })

  afterEach(perf.uninstall)

  it('should update on resize events', () => {
    resizeTo(0, 0)
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    let i = 0
    for (; i < Math.ceil(1000 / 30) + 1; i++) {
      perf.advanceBy(1)
      expect(result.current[0]).toBe(0)
      expect(result.current[1]).toBe(0)
      act(() => resizeTo(i, i))
    }

    expect(result.current[0]).toBe(34)
    expect(result.current[1]).toBe(34)

    for (; i < 1 + Math.ceil(1000 / 30) * 2; i++) {
      perf.advanceBy(1)
      expect(result.current[0]).toBe(34)
      expect(result.current[1]).toBe(34)
      act(() => resizeTo(i, i))
    }

    expect(result.current[0]).toBe(68)
    expect(result.current[1]).toBe(68)
  })

  it('should update on the leading edge', () => {
    const {result} = renderWindowSize({leading: true})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => resizeTo(600, 400))
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)
  })

  it('should update according to custom "fps"', () => {
    const {result} = renderWindowSize({fps: 60})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    let i = 0
    for (; i < Math.ceil(1000 / 60) + 1; i++) {
      perf.advanceBy(1)
      expect(result.current[0]).toBe(0)
      expect(result.current[1]).toBe(0)
      act(() => resizeTo(i, i))
    }

    expect(result.current[0]).toBe(17)
    expect(result.current[1]).toBe(17)
  })

  it('should update on orientation change', () => {
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => changeOrientation(1280, 720))
    act(() => jest.advanceTimersByTime(1000 / 30))

    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })
})

describe('useWindowWidth() throttled', () => {
  it('it should update when the window width changes', () => {
    resizeTo(0, 0)
    const {result} = renderWindowWidth()
    expect(result.current).toBe(0)

    act(() => resizeTo(1280, 720))
    act(() => jest.advanceTimersByTime(1000 / 30))
    expect(result.current).toBe(1280)
  })
})

describe('useWindowHeight() throttled', () => {
  it('should update when the window height changes', () => {
    resizeTo(0, 0)
    const {result} = renderWindowHeight()
    expect(result.current).toBe(0)

    act(() => resizeTo(1280, 720))
    act(() => jest.advanceTimersByTime(1000 / 30))
    expect(result.current).toBe(720)
  })
})
