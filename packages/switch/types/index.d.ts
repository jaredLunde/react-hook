export interface ToggleFn {
  (): void
  on: () => void
  off: () => void
}
declare const useSwitch: (defaultValue?: boolean) => [boolean, ToggleFn]
export default useSwitch
