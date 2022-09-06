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
  options?: Omit<ThrottledWindowSizeOptions, 'initialWidth'>
) => number
export declare const useWindowWidth: (
  options?: Omit<ThrottledWindowSizeOptions, 'initialHeight'>
) => number
