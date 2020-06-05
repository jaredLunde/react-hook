declare const useChange: <T extends unknown>(
  value: T,
  onChange: (current: T, prev: T) => any
) => void
export default useChange
