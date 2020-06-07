import {renderHook, act} from '@testing-library/react-hooks'
import useSwitch from './index'

test('on', () => {
  const {result} = renderHook(() => useSwitch())
  expect(result.current[0]).toBe(false)
  act(result.current[1].on)
  expect(result.current[0]).toBe(true)
})

test('off', () => {
  const {result} = renderHook(() => useSwitch(true))
  expect(result.current[0]).toBe(true)
  act(result.current[1].off)
  expect(result.current[0]).toBe(false)
})

test('toggle', () => {
  const {result} = renderHook(() => useSwitch(false))
  expect(result.current[0]).toBe(false)
  act(result.current[1])
  expect(result.current[0]).toBe(true)
  act(result.current[1])
  expect(result.current[0]).toBe(false)
})
