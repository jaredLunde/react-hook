import * as React from 'react'
import useLatest from '@react-hook/latest'

/**
 * A hook for creating controlled toggles with on, off, and toggle callbacks.
 * This is extremely useful for creating controlled inputs for components like Checkbox.
 *
 * @param defaultValue Sets the default value of the switch
 * @param controlledValue Sets the controlled value of the switch, which will override
 *  the defaultValue
 * @param onChange A callback invoked whenever the value in state changes
 */
function useSwitch(
  defaultValue = false,
  controlledValue?: boolean,
  onChange: (value: boolean, prevValue: boolean) => any = noop
) {
  const [current, setCurrent] = React.useState(controlledValue ?? defaultValue)
  const storedOnChange = useLatest(onChange)

  React.useEffect(() => {
    if (typeof controlledValue === 'boolean') {
      setCurrent(controlledValue)
    }
  }, [controlledValue])

  const toggle = React.useCallback(
    () =>
      setCurrent((current: boolean) => {
        const next = !current
        storedOnChange.current(next, current)
        return next
      }),
    [storedOnChange]
  )

  return [
    controlledValue ?? current,
    Object.assign(toggle, {
      on: React.useCallback(() => {
        setCurrent((current) => {
          if (!current) storedOnChange.current(true, false)
          return true
        })
      }, [storedOnChange]),
      off: React.useCallback(() => {
        setCurrent((current) => {
          if (current) storedOnChange.current(false, true)
          return false
        })
      }, [storedOnChange]),
    }),
  ] as const
}

function noop() {}

export default useSwitch
