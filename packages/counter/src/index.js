import {useCallback, useState, useEffect} from 'react'
import emptyObj from 'empty/object'


export default (initialValue = 0, opt = emptyObj) => {
  opt = typeof initialValue === 'object' && initialValue !== null ? initialValue : opt
  const
    {min, max, cast = Number, step = 1, onChange} = opt,
    [value, _setValue] = useState(typeof initialValue === 'object' ? 0 : initialValue)

  const
    setValue = useCallback(
      value => {
        if (min === void 0 || min === null || value >= min) {
          if (max === void 0 || max === null || value <= max) {
            _setValue(cast(value))
          }
          else {
            throw new Error(`Value '${value}' is exceeded the maximum value of: ${max}`)
          }
        }
        else {
          throw new Error(`Value '${value}' is less than the minimum value of: ${min}`)
        }
      },
      [min, max, cast]
    ),
    incr = useCallback((by = step) => setValue(value + by), [value, setValue]),
    decr = useCallback((by = step) => setValue(value - by), [value, setValue])

  useEffect(() => {typeof onChange === 'function' && onChange(value)}, [value])
  return {value, setValue, incr, decr}
}