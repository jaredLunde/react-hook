import {renderHook, act} from '@testing-library/react-hooks'
// @ts-ignore
import {resetSize, resizeTo, changeOrientation} from 'test-utils'
import {useWindowSize, useWindowWidth, useWindowHeight} from './index'

const renderWindowSize = (...args): any =>
  renderHook(() => useWindowSize(...args))

const renderWindowWidth = (...args): any =>
  renderHook(() => useWindowWidth(...args))

const renderWindowHeight = (...args): any =>
  renderHook(() => useWindowHeight(...args))

describe('useWindowSize() debounced', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    resetSize()
  })

  it('should update on resize events', () => {
    resizeTo(600, 400)
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)
    for (let i = 0; i < 60; i++) {
      act(() => resizeTo(Math.random(), Math.random()))
    }
    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)
    act(() => jest.advanceTimersByTime(100))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  it('should update on the leading edge', () => {
    const {result} = renderWindowSize({leading: true})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)
    act(() => resizeTo(600, 400))

    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)

    for (let i = 0; i < 60; i++) {
      act(() => resizeTo(Math.random(), Math.random()))
    }

    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)

    act(() => jest.advanceTimersByTime(100))
    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  it('should update according to custom "wait" times', () => {
    const {result} = renderWindowSize({wait: 1000})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    for (let i = 0; i < 60; i++)
      act(() => resizeTo(Math.random(), Math.random()))

    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => jest.advanceTimersByTime(999))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => jest.advanceTimersByTime(1))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  it('should update on orientation change', () => {
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => changeOrientation(1280, 720))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => jest.advanceTimersByTime(100))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })
})

describe('useWindowWidth() debounced', () => {
  it('it should update when the window width changes', () => {
    resizeTo(0, 0)
    const {result} = renderWindowWidth()
    expect(result.current).toBe(0)

    act(() => resizeTo(1280, 720))
    act(() => jest.advanceTimersByTime(100))
    expect(result.current).toBe(1280)
  })
})

describe('useWindowHeight() debounced', () => {
  it('should update when the window height changes', () => {
    resizeTo(0, 0)
    const {result} = renderWindowHeight()
    expect(result.current).toBe(0)

    act(() => resizeTo(1280, 720))
    act(() => jest.advanceTimersByTime(100))
    expect(result.current).toBe(720)
  })
})
