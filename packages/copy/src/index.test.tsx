import {renderHook, act} from '@testing-library/react-hooks'
import useCopy from './index'

describe('useCopy()', () => {
  const writeText = jest.fn(async (text) => text)
  // @ts-ignore
  window.navigator.clipboard = {
    writeText,
  }
  it('should work', async () => {
    const {result} = renderHook(() => useCopy('copy me'))
    expect(result.current.copied).toBe(false)
    await act(() => result.current.copy())
    expect(writeText).toBeCalled()
    expect(result.current.copied).toBe(true)
    act(() => result.current.reset())
    expect(result.current.copied).toBe(false)
  })
})
