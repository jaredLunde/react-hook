import {fireEvent} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import useHover from './index'

it('responds to enters and leaves', () => {
  const element = document.createElement('div')

  const {result} = renderHook(() => useHover(element))

  expect(result.current).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })
  expect(result.current).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })
  expect(result.current).toBe(false)
})

it('responds to enter delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')
  const {result} = renderHook(() => useHover(element, {enterDelay: 1000}))

  expect(result.current).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })
  expect(result.current).toBe(false)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })
  expect(result.current).toBe(false)
})

it('responds to leave delay', () => {
  jest.useFakeTimers()
  const element = document.createElement('div')

  const {result} = renderHook(() =>
    useHover(element, {enterDelay: 0, leaveDelay: 1000})
  )

  expect(result.current).toBe(false)

  act(() => {
    fireEvent.mouseEnter(element)
  })
  expect(result.current).toBe(true)

  act(() => {
    fireEvent.mouseLeave(element)
  })
  expect(result.current).toBe(true)

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current).toBe(false)
})
