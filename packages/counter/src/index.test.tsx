import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from './index'

describe('useCounter()', () => {
  it('should set initial value', () => {
    const {result} = renderHook(() => useCounter(15))
    expect(result.current.value).toBe(15)
  })

  it('should incr value', () => {
    const {result} = renderHook(() => useCounter(15))
    act(() => result.current.incr())
    expect(result.current.value).toBe(16)
  })

  it('should decr value', () => {
    const {result} = renderHook(() => useCounter(15))
    act(() => result.current.decr())
    expect(result.current.value).toBe(14)
  })

  it('should incr value by step', () => {
    const {result} = renderHook(() => useCounter(15, {step: 2}))
    act(() => result.current.incr())
    expect(result.current.value).toBe(17)
  })

  it('should decr value by step', () => {
    const {result} = renderHook(() => useCounter(15, {step: 2}))
    act(() => result.current.decr())
    expect(result.current.value).toBe(13)
  })

  it('should set value', () => {
    const {result} = renderHook(() => useCounter(15))
    act(() => result.current.set(24))
    expect(result.current.value).toBe(24)
  })

  it('should obey max value', () => {
    const {result} = renderHook(() => useCounter(15, {max: 15}))
    act(() => result.current.incr())
    expect(result.current.value).toBe(15)
  })

  it('should obey min value', () => {
    const {result} = renderHook(() => useCounter(15, {min: 15}))
    act(() => result.current.decr())
    expect(result.current.value).toBe(15)
  })

  it('should set value to min when initialValue is less than min', () => {
    const {result} = renderHook(() => useCounter(14, {min: 15}))
    expect(result.current.value).toBe(15)
  })

  it('should set value to max when initialValue is greater than max', () => {
    const {result} = renderHook(() => useCounter(16, {max: 15}))
    expect(result.current.value).toBe(15)
  })

  it('should set value to min when initialValue is less than min 2', () => {
    const {result} = renderHook(() => useCounter(14, {min: 15, max: 18}))
    expect(result.current.value).toBe(15)
  })

  it('should set value to max when initialValue is greater than max 2', () => {
    const {result} = renderHook(() => useCounter(16, {max: 15, min: 14}))
    expect(result.current.value).toBe(15)
  })

  it('should set max value when set returns value greater than max', () => {
    const {result} = renderHook(() => useCounter(14, {max: 15}))
    act(() => result.current.set(20))
    expect(result.current.value).toBe(15)
  })

  it('should set min value when set returns value greater than min', () => {
    const {result} = renderHook(() => useCounter(16, {min: 15}))
    act(() => result.current.set(12))
    expect(result.current.value).toBe(15)
  })

  it('should set max value when incr by returns value greater than max', () => {
    const {result} = renderHook(() => useCounter(14, {max: 15}))
    act(() => result.current.incr(2))
    expect(result.current.value).toBe(15)
  })

  it('should set min value when decr by returns value less than min', () => {
    const {result} = renderHook(() => useCounter(16, {min: 15}))
    act(() => result.current.decr(2))
    expect(result.current.value).toBe(15)
  })

  it('should call onMax callback when max threshold is exceeded', () => {
    const {result} = renderHook(() =>
      useCounter(14, {max: 15, onMax: (set) => act(() => set(0))})
    )
    act(() => result.current.incr(2))
    expect(result.current.value).toBe(0)
  })

  it('should call onMin callback when min threshold is exceeded', () => {
    const {result} = renderHook(() =>
      useCounter(16, {min: 15, onMin: (set) => act(() => set(24))})
    )
    act(() => result.current.decr(2))
    expect(result.current.value).toBe(24)
  })
})
