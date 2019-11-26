import {fireEvent} from '@testing-library/dom'
import {renderHook, act} from '@testing-library/react-hooks'
import useMousePosition from './index'

it('responds to enters and leaves', () => {
  const element = document.createElement('div')

  const {result} = renderHook(() => useMousePosition())

  act(() => {
    result.current[1](element)
  })

  expect(result.current[0].isOver).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0].isOver).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0].isOver).toBe(false)
})

it('responds to enter delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')

  const {result} = renderHook(() => useMousePosition(100))

  act(() => {
    result.current[1](element)
  })

  expect(result.current[0].isOver).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0].isOver).toBe(false)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current[0].isOver).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0].isOver).toBe(false)
})

it('responds to leave delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')

  const {result} = renderHook(() => useMousePosition(0, 100))

  act(() => {
    result.current[1](element)
  })

  expect(result.current[0].isOver).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0].isOver).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0].isOver).toBe(true)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current[0].isOver).toBe(false)
})
