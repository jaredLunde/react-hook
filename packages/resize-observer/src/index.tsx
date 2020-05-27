import * as React from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import ResizeObserver from 'resize-observer-polyfill'

/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */
const useResizeObserver = <T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback
): ResizeObserver => {
  const resizeObserver = getResizeObserver()
  const storedCallback = React.useRef(callback)
  storedCallback.current = callback

  useLayoutEffect(() => {
    let didUnsubscribe = false

    const callback = (
      entries: ResizeObserverEntry[],
      observer: ResizeObserver
    ) => {
      if (didUnsubscribe) return
      const targetEl = target && 'current' in target ? target.current : target

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        if (entry.target === targetEl) {
          storedCallback.current(entry, observer)
        }
      }
    }

    resizeObserver.subscribe(callback)
    return () => {
      didUnsubscribe = true
      resizeObserver.unsubscribe(callback)
    }
  }, [target, resizeObserver])

  useLayoutEffect(() => {
    const targetEl = target && 'current' in target ? target.current : target
    if (!targetEl) return
    resizeObserver.observer.observe(targetEl)
    return () => resizeObserver.observer.unobserve(targetEl)
  }, [target, resizeObserver.observer])

  return resizeObserver.observer
}

const createResizeObserver = () => {
  const callbacks: Set<ResizeObserverCallback> = new Set()

  return {
    observer: new ResizeObserver((entries, observer) => {
      for (const callback of callbacks) callback(entries, observer)
    }),
    subscribe: (callback: ResizeObserverCallback) => callbacks.add(callback),
    unsubscribe: (callback: ResizeObserverCallback) =>
      callbacks.delete(callback),
  }
}

let _resizeObserver: ReturnType<typeof createResizeObserver>

const getResizeObserver = () =>
  !_resizeObserver
    ? (_resizeObserver = createResizeObserver())
    : _resizeObserver

export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => any

export default useResizeObserver
