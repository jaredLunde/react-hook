import {renderHook, act} from '@testing-library/react-hooks'
import {useThrottle, useThrottleCallback} from './index'
import * as raf from 'raf'

const renderThrottle = (callback, ...args): any =>
  renderHook(() => useThrottle(callback, ...args))
const renderThrottleCallback = (callback, ...args): any =>
  renderHook(() => useThrottleCallback(callback, ...args))

describe('throttle', () => {
  beforeEach(raf.reset)

  test('callback [30fps]', () => {
    const cb = jest.fn()
    const {result} = renderThrottleCallback(cb, 30)
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 30}))
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 30}))
    expect(cb).toHaveBeenCalledTimes(4) // throttled + tails
  })

  test('callback [60fps]', () => {
    const cb = jest.fn()
    const {result} = renderThrottleCallback(cb, 60)
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 60}))
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 60}))
    expect(cb).toHaveBeenCalledTimes(4) // throttled + tails
  })

  test('callback leading', () => {
    const cb = jest.fn()
    const {result} = renderThrottleCallback(cb, 30, true)
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 30}))
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 1, time: 1000 / 30}))
    expect(cb).toHaveBeenCalledTimes(6) // leading + throttled + tails
  })

  test('value', () => {
    const {result} = renderThrottle(1, 60)
    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    act(() => result.current[1](3))
    act(() => raf.step({count: 1}))
    expect(result.current[0]).toBe(3)
  })

  test('value leading', () => {
    const {result} = renderThrottle(1, 60, true)
    act(() => result.current[1](2))
    expect(result.current[0]).toBe(2) // leading
    act(() => result.current[1](3))
    act(() => raf.step({count: 1}))
    expect(result.current[0]).toBe(3)
  })
})
