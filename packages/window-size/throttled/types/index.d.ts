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
    | Pick<ThrottledWindowSizeOptions, 'initialHeight' | 'leading' | 'fps'>
    | undefined
) => number
export declare const useWindowWidth: (
  options?:
    | Pick<ThrottledWindowSizeOptions, 'initialHeight' | 'leading' | 'fps'>
    | undefined
) => number
