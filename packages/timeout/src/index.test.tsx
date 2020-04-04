/* jest */
import {renderHook, act} from '@testing-library/react-hooks'
import {useTimeout} from './index'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('useTimeout()', () => {
  it('should return timedOut = true when timeout duration has been met', () => {
    const {result} = renderHook(() => useTimeout(300))
    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    act(() => jest.advanceTimersByTime(299))
    expect(result.current[0]).toBe(false)
    act(() => jest.advanceTimersByTime(1))
    expect(result.current[0]).toBe(true)
  })

  it('should reset the current timer when reset() is invoked', () => {
    const {result} = renderHook(() => useTimeout(300))
    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    act(() => jest.advanceTimersByTime(299))
    expect(result.current[0]).toBe(false)
    act(() => result.current[2]())
    act(() => jest.advanceTimersByTime(1))
    expect(result.current[0]).toBe(false)
  })

  it('should reset the current timer when the ms argument changes', () => {
    const {result, rerender} = renderHook(
      ({initialValue}) => useTimeout(initialValue),
      {
        initialProps: {initialValue: 300},
      }
    )

    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    act(() => jest.advanceTimersByTime(299))
    expect(result.current[0]).toBe(false)
    rerender({initialValue: 1})
    act(() => jest.advanceTimersByTime(1))
    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    act(() => jest.advanceTimersByTime(1))
    expect(result.current[0]).toBe(true)
  })
})
