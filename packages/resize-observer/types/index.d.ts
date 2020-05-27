import * as React from 'react'
import ResizeObserver from 'resize-observer-polyfill'
/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */
export declare const useResizeObserver: <T extends HTMLElement>(
  target: T | React.RefObject<T> | null,
  callback: UseResizeObserverCallback
) => ResizeObserver
export declare type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => any
