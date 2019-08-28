/* jest */
// import React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import useSwitch from './index'

const renderSwitch = (...args) => renderHook(() => useSwitch(...args))

test('on', () => {
  const {result} = renderSwitch()
  expect(result.current[0]).toBe(false)
  act(result.current[1].on)
  expect(result.current[0]).toBe(true)
})

test('off', () => {
  const {result} = renderSwitch(false, true, true)
  expect(result.current[0]).toBe(true)
  act(result.current[1].off)
  expect(result.current[0]).toBe(false)
})

test('toggle', () => {
  const {result} = renderSwitch()
  expect(result.current[0]).toBe(false)
  act(result.current[1])
  expect(result.current[0]).toBe(true)
  act(result.current[1])
  expect(result.current[0]).toBe(false)
})

test('custom offValue, onValue', () => {
  const {result} = renderSwitch('off', 'on')
  expect(result.current[0]).toBe('off')
  act(result.current[1])
  expect(result.current[0]).toBe('on')
})

test('throws', () => {
  expect(() => {
    throw renderSwitch(false, true, 'off').result.error
  }).toThrowErrorMatchingSnapshot()
})
