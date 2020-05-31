declare const useSwitch: (defaultValue?: boolean) => [boolean, ToggleFn]
export interface ToggleFn {
  (): void
  on: () => void
  off: () => void
}
export default useSwitch
