import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync} from './index'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('useAsync()', () => {
  it('should do a thing', async () => {
    const {result} = renderHook(() =>
      useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000)
          }),
        []
      )
    )
    const [state, callback] = result.current
    let res
    act(() => {
      res = callback()
    })
    console.log(result.current[0], res)
    act(() => jest.advanceTimersByTime(1000))
    await act(async () => await res)
    console.log(result.current[0], res)
    expect(result.current[0].value).toBe(true)
  })
})
