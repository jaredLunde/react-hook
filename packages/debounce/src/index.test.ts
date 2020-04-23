import {renderHook, act} from '@testing-library/react-hooks'
import {useDebounce, useDebounceCallback} from './index'

const renderDebounce = (callback, ...args) =>
  renderHook(() => useDebounce(callback, ...args))
const renderDebounceCallback = (fn, ...args) =>
  renderHook(() => useDebounceCallback(fn, ...args))

describe('useDebounce()', () => {
  jest.useFakeTimers()

  test('callback [30ms]', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 30)
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => {
      jest.advanceTimersByTime(30)
    })
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => {
      jest.advanceTimersByTime(30)
    })
    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('callback [60ms]', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 60)
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => {
      jest.advanceTimersByTime(60)
    })
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => {
      jest.advanceTimersByTime(60)
    })
    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('callback leading', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 30, true)

    for (let i = 0; i < 30; i++) act(result.current)
    expect(cb).toHaveBeenCalledTimes(1)

    // add 30ms
    act(() => {
      jest.advanceTimersByTime(30)
    })

    for (let i = 0; i < 30; i++) act(result.current)
    // add 30ms
    act(() => {
      jest.advanceTimersByTime(30)
    })

    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('value [60ms]', () => {
    const {result} = renderDebounce(1, 60)

    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    act(() => result.current[1](3))

    // add 60ms
    act(() => {
      jest.advanceTimersByTime(60)
    })
    expect(result.current[0]).toBe(3)
  })

  test('value [<60ms]', () => {
    const {result} = renderDebounce(1, 60)

    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    act(() => result.current[1](3))

    // add 59ms
    act(() => {
      jest.advanceTimersByTime(59)
    })
    expect(result.current[0]).toBe(1)

    // add 1ms
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current[0]).toBe(3)
  })

  test('value leading', () => {
    const {result} = renderDebounce(1, 60, true)
    act(() => result.current[1](2))
    expect(result.current[0]).toBe(2) // leading

    act(() => result.current[1](3))
    expect(result.current[0]).toBe(2)
    // add 60ms
    act(() => {
      jest.advanceTimersByTime(60)
    })
    expect(result.current[0]).toBe(2)

    act(() => result.current[1](4)) // leading
    expect(result.current[0]).toBe(4)
  })
})
