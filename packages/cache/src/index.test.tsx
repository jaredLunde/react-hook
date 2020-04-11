/* jest */
import {renderHook, act} from '@testing-library/react-hooks'
import {createCache, useCache, useCacheEffect} from './index'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('createCache()', () => {
  it('should load a key', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected = {status: 'success', value: 'foo', error: undefined}
    expect(await cache.load('foo')).toEqual(expected)
    expect(cache.read('foo')).toEqual(expected)
  })

  it('should subscribe to a key', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const subscriber1 = jest.fn() // subcribed to 'foo'
    const subscriber2 = jest.fn() // subcribed to 'foo'
    const subscriber3 = jest.fn() // NOT subcribed to 'foo'
    const expected1 = {status: 'loading', value: undefined, error: undefined}
    const expected2 = {status: 'success', value: 'foo', error: undefined}

    cache.subscribe('foo', subscriber1)
    cache.subscribe('foo', subscriber2)
    cache.subscribe('bar', subscriber3)
    await cache.load('foo')

    expect(subscriber1).toBeCalledWith(expected1)
    expect(subscriber1).toBeCalledWith(expected2)
    expect(subscriber1).toBeCalledTimes(2)

    expect(subscriber2).toBeCalledWith(expected1)
    expect(subscriber2).toBeCalledWith(expected2)
    expect(subscriber2).toBeCalledTimes(2)

    expect(subscriber3).not.toBeCalled()
  })

  it('should unsubscribe from a key', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const subscriber = jest.fn()

    cache.subscribe('foo', subscriber)
    cache.unsubscribe('foo', subscriber)
    await cache.load('foo')

    expect(subscriber).not.toBeCalled()
  })
})

describe('useCache', () => {
  it('should handle Promise.resolve', async () => {
    const cache = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000)
        })
    )
    const {result, waitForNextUpdate} = renderHook(() => useCache(cache, 'foo'))
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

  it('should persist between hooks', async () => {
    const cache = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000)
        })
    )
    const {result, waitForNextUpdate} = renderHook(() => useCache(cache, 'foo'))
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

    const {result: result2} = renderHook(() => useCache(cache, 'foo'))
    expect(result2.current[0].value).toBe(true)
    expect(result2.current[0].status).toBe('success')
  })

  it('should cancel the callback despite success', async () => {
    const cache = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000)
        })
    )
    const {result} = renderHook(() => useCache(cache, 'foo'))

    let cancelled
    act(() => {
      cancelled = result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => {
      result.current[0].cancel()
    })
    act(() => jest.advanceTimersByTime(1000))
    await cancelled
    expect(result.current[0].status).toBe('cancelled')
    expect(result.current[0].value).toBe(undefined)
  })

  it('should cancel the callback despite errors', async () => {
    const cache = createCache(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject('Uh oh'), 1000)
        })
    )
    const {result} = renderHook(() => useCache(cache, 'foo'))

    let cancelled
    act(() => {
      cancelled = result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => {
      result.current[0].cancel()
    })
    act(() => jest.advanceTimersByTime(1000))
    await cancelled
    expect(result.current[0].status).toBe('cancelled')
    expect(result.current[0].value).toBe(undefined)
  })

  it('should restart after cancel', async () => {
    const cache = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000)
        })
    )
    const {result, waitForNextUpdate} = renderHook(() => useCache(cache, 'foo'))
    // Initial cancellation
    act(() => {
      result.current[1]()
    })
    act(() => {
      result.current[0].cancel()
    })
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

describe('useCacheEffect', () => {
  it('should update when deps change', async () => {
    const cache = createCache(
      (key) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(key)
          }, 1000)
        })
    )
    const {result, rerender, waitForNextUpdate} = renderHook(
      ({deps}) => useCacheEffect(cache, deps[0] ? 'foo' : 'bar', deps),
      {
        initialProps: {deps: [true]},
      }
    )

    expect(result.current.value).toBe(undefined)
    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.value).toBe('foo')

    rerender({deps: [false]})
    // Yes, this value should be persisted and not reset
    expect(result.current.value).toBe(undefined)
    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.value).toBe('bar')
    expect(result.current.status).toBe('success')
  })

  it('should handle thrown exceptions', async () => {
    const cache = createCache(async () => {
      throw new Error('Uh oh')
    })
    const {result, waitForNextUpdate} = renderHook(() =>
      useCacheEffect(cache, 'foo', [])
    )

    expect(result.current.status).toBe('loading')
    await waitForNextUpdate()
    expect(result.current.status).toBe('error')
    expect(result.current.value).toBe(undefined)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('Uh oh')
  })

  it('should handle Promise.reject', async () => {
    const cache = createCache(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject('Uh oh'), 1000)
        })
    )

    const {result, waitForNextUpdate} = renderHook(() =>
      useCacheEffect(cache, 'foo', [])
    )

    expect(result.current.status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current.status).toBe('error')
    expect(result.current.value).toBe(undefined)
    expect(result.current.error).toBe('Uh oh')
  })
})
