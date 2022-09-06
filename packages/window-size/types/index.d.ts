export interface DebouncedWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  wait?: number
  leading?: boolean
}
export declare const useWindowSize: (
  options?: DebouncedWindowSizeOptions
) => readonly [number, number]
export declare const useWindowHeight: (
  options?: Omit<DebouncedWindowSizeOptions, 'initialWidth'>
) => number
export declare const useWindowWidth: (
  options?: Omit<DebouncedWindowSizeOptions, 'initialHeight'>
) => number
