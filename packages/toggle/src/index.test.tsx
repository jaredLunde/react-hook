import {renderHook, act} from '@testing-library/react-hooks'
import useToggle from './index'

describe('useToggle()', () => {
  it('should have expected defaults', () => {
    const {result} = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('should use custom off/on values', () => {
    const {result} = renderHook(() => useToggle('off', 'on'))
    expect(result.current[0]).toBe('off')
    act(() => result.current[1]())
    expect(result.current[0]).toBe('on')
  })

  it('should default to user-defined default', () => {
    const {result} = renderHook(() => useToggle('off', 'on', 'on'))
    expect(result.current[0]).toBe('on')
    act(() => result.current[1]())
    expect(result.current[0]).toBe('off')
  })
})
