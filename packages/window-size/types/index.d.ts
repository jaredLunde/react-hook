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
  options?:
    | Pick<DebouncedWindowSizeOptions, 'wait' | 'initialHeight' | 'leading'>
    | undefined
) => number
export declare const useWindowWidth: (
  options?:
    | Pick<DebouncedWindowSizeOptions, 'wait' | 'initialWidth' | 'leading'>
    | undefined
) => number
