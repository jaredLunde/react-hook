/* jest */
import {renderHook, act} from '@testing-library/react-hooks'
import {useMediaQueries, useMediaQuery, MediaQueries} from './index'

describe('useMediaQueries', () => {
  it('should return correct matches with addListener', () => {
    const addListener = jest.fn()
    const removeListener = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('foo'),
        media: query,
        addListener,
        removeListener,
      }
    })

    const {result} = renderHook(() => useMediaQueries({foo: 'foo', bar: 'bar'}))
    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matches.bar).toBe(false)
    expect(result.current.matchesAll).toBe(false)
    expect(result.current.matchesAny).toBe(true)
  })

  it('should return correct matches with addEventListener', () => {
    const addListener = jest.fn()
    const removeListener = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('foo'),
        media: query,
        addEventListener: addListener,
        removeEventListener: removeListener,
      }
    })

    const {
      result,
      rerender,
    } = renderHook((queries: MediaQueries<any> = {foo: 'foo', bar: 'bar'}) =>
      useMediaQueries(queries)
    )

    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matches.bar).toBe(false)
    expect(result.current.matchesAll).toBe(false)
    expect(result.current.matchesAny).toBe(true)
    rerender({foo: 'foo', baz: 'baz'})
    expect(removeListener).toBeCalledTimes(2)
    expect(addListener).toBeCalledTimes(4)
  })

  it('shold update the query listeners when they change', () => {
    const addListener = jest.fn()
    const removeListener = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('foo') || query.includes('baz'),
        media: query,
        addListener,
        removeListener,
      }
    })

    const {
      result,
      rerender,
    } = renderHook((queries: MediaQueries<any> = {foo: 'foo', bar: 'bar'}) =>
      useMediaQueries(queries)
    )

    expect(addListener).toBeCalledTimes(2)
    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matches.bar).toBe(false)

    rerender({foo: 'foo', bar: 'baz'})
    expect(removeListener).toBeCalledTimes(2)
    expect(addListener).toBeCalledTimes(4)
    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matches.bar).toBe(true)
    expect(result.current.matchesAll).toBe(true)
  })

  it('shold update the query listeners when they change length', () => {
    const addListener = jest.fn()
    const removeListener = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('foo') || query.includes('baz'),
        media: query,
        addListener,
        removeListener,
      }
    })

    const {
      result,
      rerender,
    } = renderHook((queries: MediaQueries<any> = {foo: 'foo', bar: 'bar'}) =>
      useMediaQueries(queries)
    )

    expect(addListener).toBeCalledTimes(2)
    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matches.bar).toBe(false)

    rerender({foo: 'foo'})
    expect(removeListener).toBeCalledTimes(2)
    expect(addListener).toBeCalledTimes(3)
    expect(result.current.matches.foo).toBe(true)
    expect(result.current.matchesAll).toBe(true)
  })

  it('should not match any', () => {
    const addListener = jest.fn()
    const removeListener = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        addListener,
        removeListener,
      }
    })

    const {
      result,
    } = renderHook((queries: MediaQueries<any> = {foo: 'foo', bar: 'bar'}) =>
      useMediaQueries(queries)
    )

    expect(result.current.matchesAny).toBe(false)
  })

  it('should update matches when the listener is invoked', () => {
    let callback
    let matches = true

    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        get matches() {
          return matches
        },
        media: query,
        addListener: (cb) => {
          callback = cb
        },
        removeListener: jest.fn(),
      }
    })

    const {result} = renderHook((queries: string[] = ['foo']) =>
      useMediaQueries(queries)
    )

    expect(result.current.matches[0]).toBe(true)
    matches = false
    act(callback)
    expect(result.current.matches[0]).toBe(false)
  })
})

describe('useMediaQuery', () => {
  it('should return correct matches for single media query', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('foo'),
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const {result, rerender} = renderHook((query: string = 'foo') =>
      useMediaQuery(query)
    )

    expect(result.current).toBe(true)
    rerender('bar')
    expect(result.current).toBe(false)
  })
})
