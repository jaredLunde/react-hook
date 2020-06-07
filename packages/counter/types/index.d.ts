declare const useCounter: (
  initialValue?: number,
  options?: UseCounterOptions
) => {
  value: number
  set: (value: number) => void
  incr: (by?: any) => void
  decr: (by?: any) => void
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
