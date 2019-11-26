import {fireEvent} from '@testing-library/dom'
import {renderHook, act} from '@testing-library/react-hooks'
import useHover from './index'

it('responds to enters and leaves', () => {
  const element = document.createElement('div')

  const {result} = renderHook(() => {
    const result = useHover()
    result[1].current = element
    return result
  })

  expect(result.current[0]).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0]).toBe(false)
})

it('responds to enter delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')

  const {result} = renderHook(() => {
    const result = useHover(1000)
    result[1].current = element
    return result
  })

  expect(result.current[0]).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0]).toBe(false)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0]).toBe(false)
})

it('responds to leave delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')

  const {result} = renderHook(() => {
    const result = useHover(0, 1000)
    result[1].current = element
    return result
  })

  expect(result.current[0]).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current[0]).toBe(false)
})
