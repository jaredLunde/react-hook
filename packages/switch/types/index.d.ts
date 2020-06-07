declare const useSwitch: (
  defaultValue?: boolean
) => readonly [
  boolean,
  (() => void) & {
    on: () => void
    off: () => void
  }
]
export default useSwitch
