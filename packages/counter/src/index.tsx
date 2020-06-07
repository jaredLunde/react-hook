import * as React from 'react'
import useLatest from '@react-hook/latest'

const useCounter = (initialValue = 0, options: UseCounterOptions = {}) => {
  const {min, max, cast = Number, step = 1, onMin, onMax} = options
  const [value, _setValue] = React.useState(
    Math.min(
      Math.max(initialValue, min ?? initialValue),
      max ?? min ?? initialValue
    )
  )
  const storedOnMin = useLatest(onMin)
  const storedOnMax = useLatest(onMax)
  const set = React.useCallback(
    (value: number) => {
      if (min === void 0 || min === null || value >= min) {
        if (max === void 0 || max === null || value <= max) {
          _setValue(cast(value))
        } else {
          _setValue(max)
          storedOnMax.current?.(set)
        }
      } else {
        _setValue(min)
        storedOnMin.current?.(set)
      }
    },
    [min, max, cast, storedOnMin, storedOnMax]
  )

  return {
    value,
    set,
    incr: React.useCallback((by = step) => set(value + by), [value, set, step]),
    decr: React.useCallback((by = step) => set(value - by), [value, set, step]),
  }
}

export interface UseCounterOptions {
  min?: number
  max?: number
  cast?: (value: number) => number
  step?: number
  onMin?: (set: (value: number) => void) => void
  onMax?: (set: (value: number) => void) => void
}

export default useCounter
