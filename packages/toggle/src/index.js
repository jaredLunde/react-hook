import {useState, useCallback} from 'react'


export default (off = false, on = true, defaultValue = off) => {
  if (__DEV__) {
    if (defaultValue !== on && defaultValue !== off) {
      throw new Error(
        `'defaultValue' must be one of either the 'off' or 'on' value. `
        + `'${defaultValue}' was not equal to '${off}' or '${on}'.`
      )
    }
  }

  const [value, setValue] = useState(defaultValue)

  return [
    value,
    useCallback(
      () => setValue(value === off ? on : off),
      [value, on, off]
    )
  ]
}
