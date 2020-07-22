export interface ThrottledWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  fps?: number
  leading?: boolean
}
export declare const useWindowSize: (
  options?: ThrottledWindowSizeOptions
) => readonly [number, number]
export declare const useWindowHeight: (
  options?:
    | Pick<ThrottledWindowSizeOptions, 'initialHeight' | 'fps' | 'leading'>
    | undefined
) => number
export declare const useWindowWidth: (
  options?:
    | Pick<ThrottledWindowSizeOptions, 'initialWidth' | 'fps' | 'leading'>
    | undefined
) => number
