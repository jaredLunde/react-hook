import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync, useAsyncEffect} from './index'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('useAsync()', () => {
  it('should handle Promise.resolve', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000)
          })
      )
    )
    expect(result.current[0].status).toBe('idle')
    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current[0].value).toBe(true)
    expect(result.current[0].status).toBe('success')
    expect(result.current[0].error).toBe(undefined)
  })

  it('should cancel the callback', async () => {
    const {result} = renderHook(() =>
      useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000)
          })
      )
    )

    let cancelled
    act(() => {
      cancelled = result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => result.current[0].cancel())
    act(() => jest.advanceTimersByTime(1000))
    await cancelled
    expect(result.current[0].status).toBe('cancelled')
    expect(result.current[0].value).toBe(undefined)
  })

  it('should restart after cancel', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000)
          })
      )
    )
    // Initial cancellation
    act(() => {
      result.current[1]()
    })
    act(() => result.current[0].cancel())
    act(() => jest.advanceTimersByTime(1000))
    expect(result.current[0].status).toBe('cancelled')
    expect(result.current[0].value).toBe(undefined)
    // Try again
    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current[0].status).toBe('success')
    expect(result.current[0].value).toBe(true)
  })
})

describe('useAsyncEffect()', () => {
  it('should update when deps change', async () => {
    const {result, rerender, waitForNextUpdate} = renderHook(
      ({deps}) =>
        useAsyncEffect(
          () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(deps[0])
              }, 1000)
            }),
          deps
        ),
      {
        initialProps: {deps: [true]},
      }
    )

    expect(result.current.value).toBe(undefined)
    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.value).toBe(true)

    rerender({deps: [false]})
    // Yes, this value should be persisted and not reset
    expect(result.current.value).toBe(true)
    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.value).toBe(false)
    expect(result.current.status).toBe('success')
  })

  it('should handle thrown exceptions', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useAsyncEffect(async () => {
        throw new Error('Uh oh')
      }, [])
    )

    expect(result.current.status).toBe('loading')
    await waitForNextUpdate()
    expect(result.current.status).toBe('error')
    expect(result.current.value).toBe(undefined)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('Uh oh')
  })

  it('should handle Promise.reject', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useAsyncEffect(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject('Uh oh'), 1000)
          }),
        []
      )
    )

    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.status).toBe('error')
    expect(result.current.value).toBe(undefined)
    expect(result.current.error).toBe('Uh oh')
  })
})
