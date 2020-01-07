import {renderHook, act} from '@testing-library/react-hooks'
import {useDebounce, useDebounceCallback} from './index'
import * as raf from 'raf'

const renderDebounce = (callback, ...args) =>
  renderHook(() => useDebounce(callback, ...args))
const renderDebounceCallback = (fn, ...args) =>
  renderHook(() => useDebounceCallback(fn, ...args))

describe('debounce', () => {
  beforeEach(raf.reset)

  test('callback [30ms]', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 30)
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 60 * 30}))
    for (let i = 0; i < 30; i++) act(result.current)
    act(() => raf.step({count: 60 * 30}))
    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('callback [60ms]', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 60)
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => raf.step({count: 60 * 30}))
    for (let i = 0; i < 60; i++) act(result.current)
    act(() => raf.step({count: 60 * 30}))
    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('callback leading', () => {
    const cb = jest.fn()
    const {result} = renderDebounceCallback(cb, 30, true)

    for (let i = 0; i < 30; i++) act(result.current)
    // add 30ms
    act(() => raf.step({count: 1, time: 30}))

    for (let i = 0; i < 30; i++) act(result.current)
    // add 30ms
    act(() => raf.step({count: 1, time: 30}))

    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('value [60ms]', () => {
    const {result} = renderDebounce(1, 60)

    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    act(() => result.current[1](3))

    // add 60ms
    act(() => raf.step({count: 1, time: 60}))
    expect(result.current[0]).toBe(3)
  })

  test('value [<60ms]', () => {
    const {result} = renderDebounce(1, 60)

    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    act(() => result.current[1](3))

    // add 59ms
    act(() => raf.step({count: 1, time: 59}))
    expect(result.current[0]).toBe(1)

    // add 1ms
    act(() => raf.step({count: 1, time: 1}))
    expect(result.current[0]).toBe(3)
  })

  test('value leading', () => {
    const {result} = renderDebounce(1, 60, true)
    act(() => result.current[1](2))
    expect(result.current[0]).toBe(2) // leading
    act(() => result.current[1](3))
    expect(result.current[0]).toBe(2)
    // add 60ms
    act(() => raf.step({count: 1, time: 60}))
    expect(result.current[0]).toBe(2)

    act(() => result.current[1](4)) // leading
    expect(result.current[0]).toBe(4)
  })
})
