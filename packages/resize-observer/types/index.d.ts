import * as React from 'react'
/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */
declare function useResizeObserver<T extends Element>(
  target: React.RefObject<T> | React.ForwardedRef<T> | T | null,
  callback: UseResizeObserverCallback,
  options?: UseResizeObserverOptions
): ResizeObserver
export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => any
export type UseResizeObserverOptions = {
  polyfill?: any
}
export default useResizeObserver
