import * as React from 'react'
import {
  ResizeObserver as Polyfill,
  ResizeObserverEntry,
} from '@juggle/resize-observer'
/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */
declare function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback
): Polyfill
export declare type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: Polyfill
) => any
export default useResizeObserver
