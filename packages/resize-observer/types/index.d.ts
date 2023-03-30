import * as React from 'react'
import {
  ResizeObserver as Polyfill,
  ResizeObserverEntry,
} from '@juggle/resize-observer'
import {ResizeObserverOptions} from '@juggle/resize-observer/lib/ResizeObserverOptions'

/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 * @param [options] Provide options to ResizeObserver
 */
declare function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback,
  options?: ResizeObserverOptions
): Polyfill
export declare type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: Polyfill
) => any
export default useResizeObserver
