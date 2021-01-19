import {renderHook, act} from '@testing-library/react-hooks'
import useSwitch from './index'

describe('useSwitch()', () => {
  it('should turn on', () => {
    const {result} = renderHook(() => useSwitch())
    expect(result.current[0]).toBe(false)
    act(result.current[1].on)
    expect(result.current[0]).toBe(true)
  })

  it('should turn off', () => {
    const {result} = renderHook(() => useSwitch(true))
    expect(result.current[0]).toBe(true)
    act(result.current[1].off)
    expect(result.current[0]).toBe(false)
  })

  it('should toggle', () => {
    const {result} = renderHook(() => useSwitch(false))
    expect(result.current[0]).toBe(false)
    act(result.current[1])
    expect(result.current[0]).toBe(true)
    act(result.current[1])
    expect(result.current[0]).toBe(false)
  })

  it('should be controlled', () => {
    let value = true
    const handleChange = (nextValue: boolean) => {
      value = nextValue
    }

    const {result, rerender} = renderHook(
      ({value}) => useSwitch(false, value, handleChange),
      {initialProps: {value}}
    )

    expect(result.current[0]).toBe(true)
    act(result.current[1])
    expect(result.current[0]).toBe(true)
    rerender({value})
    expect(result.current[0]).toBe(false)
  })

  it('should be controlled externally', () => {
    const handleChange = jest.fn()
    const {result, rerender} = renderHook(
      ({value}) => useSwitch(false, value, handleChange),
      {initialProps: {value: true}}
    )

    rerender({value: false})
    expect(result.current[0]).toBe(false)
    rerender({value: true})
    expect(result.current[0]).toBe(true)
    expect(handleChange).not.toBeCalled()
    rerender({value: false})
    expect(result.current[0]).toBe(false)
    rerender({value: false})
    act(result.current[1])
    expect(result.current[0]).toBe(false)
    expect(handleChange).toBeCalledWith(true)
  })
})
