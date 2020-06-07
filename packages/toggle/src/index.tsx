import * as React from 'react'

function useToggle<Off extends any, On extends any>(
  // @ts-ignore
  off: Off = false,
  // @ts-ignore
  on: On = true,
  defaultValue: Off | On = off
) {
  /* istanbul ignore next */
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    if (defaultValue !== on && defaultValue !== off) {
      throw new Error(
        `'defaultValue' must be one of either the 'off' or 'on' value. ` +
          `'${defaultValue}' was not equal to '${off}' or '${on}'.`
      )
    }
  }

  const [value, setValue] = React.useState(defaultValue)

  return [
    value,
    React.useCallback(
      () => setValue((current) => (current === off ? on : off)),
      [on, off]
    ),
  ] as const
}

export default useToggle
