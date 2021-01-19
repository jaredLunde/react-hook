/**
 * A hook for creating controlled toggles with on, off, and toggle callbacks.
 * This is extremely useful for creating controlled inputs for components like Checkbox.
 *
 * @param defaultValue Sets the default value of the switch
 * @param controlledValue Sets the controlled value of the switch, which will override
 *  the defaultValue
 * @param onChange A callback invoked whenever toggle callbacks that change state are invoked
 */
declare function useSwitch(
  defaultValue?: boolean,
  controlledValue?: boolean,
  onChange?: (value: boolean) => any
): readonly [
  boolean,
  (() => void) & {
    on: () => void
    off: () => void
  }
]
export default useSwitch
