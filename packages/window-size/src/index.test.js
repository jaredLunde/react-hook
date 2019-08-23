import {renderHook, act} from '@testing-library/react-hooks'
import * as raf from 'raf'
import {resetSize, resizeTo, changeOrientation} from 'test-utils'
import {useWindowSize} from './index'

const renderWindowSize = (...args) => renderHook(() => useWindowSize(...args))

describe('debounced', () => {
  beforeEach(() => {
    raf.reset()
    resetSize()
  })

  test('resize', () => {
    resizeTo(600, 400)
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)
    for (let i = 0; i < 60; i++) {
      act(() => resizeTo(Math.random(), Math.random()))
    }
    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)

    act(() => raf.step({count: 1, time: 100}))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  test('resize [leading]', () => {
    const {result} = renderWindowSize(0, 0, {leading: true})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)
    act(() => resizeTo(600, 400))
    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)

    for (let i = 0; i < 60; i++) {
      act(() => resizeTo(Math.random(), Math.random()))
    }

    expect(result.current[0]).toBe(600)
    expect(result.current[1]).toBe(400)

    act(() => raf.step({count: 1, time: 100}))
    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  test('resize [wait]', () => {
    const {result} = renderWindowSize(0, 0, {wait: 1000})
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    for (let i = 0; i < 60; i++)
      act(() => resizeTo(Math.random(), Math.random()))

    act(() => resizeTo(1280, 720))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => raf.step({count: 1, time: 999}))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => raf.step({count: 1, time: 1}))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })

  test('orientationChange', () => {
    const {result} = renderWindowSize()
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => changeOrientation(1280, 720))
    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => raf.step({count: 1, time: 100}))
    expect(result.current[0]).toBe(1280)
    expect(result.current[1]).toBe(720)
  })
})
