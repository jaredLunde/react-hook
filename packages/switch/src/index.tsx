import * as React from 'react'
import useChange from '@react-hook/change'

const useCallback = React.useCallback

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
  useChange(current, onChange)

  return [
    controlledValue ?? current,
    Object.assign(
      useCallback(
        () => setCurrent((curr) => !curr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        emptyArr
      ),
      {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        on: useCallback(() => setCurrent(true), emptyArr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        off: useCallback(() => setCurrent(false), emptyArr),
      }
    ),
  ] as const
}

const emptyArr: [] = []
function noop() {}

export default useSwitch
