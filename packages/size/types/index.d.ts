import * as React from 'react'
/**
 * A React hook for measuring the size of HTML elements including when they change
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param options Configures the initial width and initial height of the hook's state
 */
declare const useSize: <T extends HTMLElement>(
  target: T | React.RefObject<T> | null,
  options?: UseSizeOptions | undefined
) => [number, number]
export interface UseSizeOptions {
  initialWidth: number
  initialHeight: number
}
export default useSize
