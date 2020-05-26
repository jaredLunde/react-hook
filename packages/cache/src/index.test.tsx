/* jest */
import {renderHook, act} from '@testing-library/react-hooks'
import {createCache, useCache, CacheExport} from './index'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

describe('createCache()', () => {
  it('should load a key', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected = {id: 0, status: 'success', value: 'foo', error: undefined}
    expect(await cache.load('foo')).toEqual(expected)
    expect(cache.read('foo')).toEqual(expected)
  })

  it('should load a key w/ args', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected = {id: 0, status: 'success', value: 'foo', error: undefined}
    expect(await cache.load('foo')).toEqual(expected)
    expect(cache.read('foo')).toEqual(expected)
  })

  it('should subscribe to a key', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const subscriber1 = jest.fn() // subcribed to 'foo'
    const subscriber2 = jest.fn() // subcribed to 'foo'
    const subscriber3 = jest.fn() // NOT subcribed to 'foo'
    const expected1 = {
      id: 0,
      status: 'loading',
      value: undefined,
      error: undefined,
    }
    const expected2 = {id: 0, status: 'success', value: 'foo', error: undefined}

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

  it('should readAll for SSR', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected = {
      foo: {id: 0, status: 'success', value: 'foo', error: undefined},
      bar: {id: 1, status: 'success', value: 'bar', error: undefined},
    }
    await cache.load('foo')
    await cache.load('bar')
    expect(cache.readAll()).toEqual(expected)
  })

  it('should write from SSR', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected: CacheExport<string> = {
      foo: {id: 0, status: 'success', value: 'foo', error: undefined},
      bar: {id: 1, status: 'success', value: 'bar', error: undefined},
    }
    cache.write(expected)
    expect(cache.readAll()).toEqual(expected)
  })

  it('should alert subscribers during write from SSR', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    const expected: CacheExport<string> = {
      foo: {id: 0, status: 'success', value: 'foo', error: undefined},
      bar: {id: 1, status: 'success', value: 'bar', error: undefined},
    }
    const subscriber = jest.fn()
    cache.subscribe('foo', subscriber)
    cache.write(expected)
    expect(subscriber).toBeCalledTimes(1)
    expect(subscriber).toBeCalledWith(expected.foo)
  })

  it('should not cancel a non-pending action', async () => {
    const cache = createCache((string) => Promise.resolve(string))
    cache.cancel('foo')
    expect(cache.read('foo')).toBeUndefined()
  })

  it('should not add a success status if the request has already been cancelled', async () => {
    const cache = createCache(
      (key) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(key), 300)
        })
    )

    const p = cache.load('foo')
    jest.advanceTimersByTime(300)
    cache.cancel('foo')
    await p
    expect(cache.read('foo')).toEqual({
      error: undefined,
      id: 0,
      status: 'cancelled',
      value: undefined,
    })
  })

  it('should not add an error status if the request has already been cancelled', async () => {
    const cache = createCache(
      (key) =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(key), 300)
        })
    )

    const p = cache.load('foo')
    jest.advanceTimersByTime(300)
    cache.cancel('foo')
    await p
    expect(cache.read('foo')).toEqual({
      error: undefined,
      id: 0,
      status: 'cancelled',
      value: undefined,
    })
  })

  it('should not reload a key while the key is already loading', async () => {
    const cache = createCache(
      (key) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(key), 300)
        })
    )

    cache.load('foo')
    const p2 = await cache.load('foo')
    expect(p2.id).toBe(0)
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

  it('should handle thrown exceptions', async () => {
    const cache = createCache(async () => {
      throw new Error('Uh oh')
    })
    const {result, waitForNextUpdate} = renderHook(() => useCache(cache, 'foo'))

    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    await waitForNextUpdate()
    expect(result.current[0].status).toBe('error')
    expect(result.current[0].value).toBe(undefined)
    expect(result.current[0].error).toBeInstanceOf(Error)
    expect(result.current[0].error.message).toBe('Uh oh')
  })

  it('should handle Promise.reject', async () => {
    const cache = createCache(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject('Uh oh'), 1000)
        })
    )

    const {result, waitForNextUpdate} = renderHook(() => useCache(cache, 'foo'))

    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')
    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current[0].status).toBe('error')
    expect(result.current[0].value).toBe(undefined)
    expect(result.current[0].error).toBe('Uh oh')
  })

  it('should update the cache when it changes', async () => {
    const cache1 = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(1), 1000)
        })
    )

    const cache2 = createCache(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(2), 1000)
        })
    )

    const {result, rerender} = renderHook(({cache}) => useCache(cache, 'foo'), {
      initialProps: {cache: cache1},
    })

    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')

    rerender({cache: cache2})
    act(() => jest.advanceTimersByTime(1000))
    expect(result.current[0].status).toBe('idle')
  })

  it('should update the key when it changes', async () => {
    const cache = createCache(
      (key) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(key), 1000)
        })
    )
    cache.load('1')
    const {result, rerender, waitForNextUpdate} = renderHook(
      ({key}) => useCache(cache, key),
      {
        initialProps: {key: '0'},
      }
    )

    act(() => {
      result.current[1]()
    })
    expect(result.current[0].status).toBe('loading')

    rerender({key: '1'})
    expect(result.current[0].status).toBe('loading')
    expect(result.current[0].value).toBe(undefined)

    act(() => jest.advanceTimersByTime(1000))
    await waitForNextUpdate()
    expect(result.current[0].status).toBe('success')
    expect(result.current[0].value).toBe('1')
  })
})
