/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import {
  ResizeObserver as Polyfill,
  ResizeObserverEntry,
} from '@juggle/resize-observer'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useLatest from '@react-hook/latest'

const ResizeObserver =
  typeof window !== 'undefined' && 'ResizeObserver' in window
    ? // @ts-ignore
      window.ResizeObserver
    : Polyfill

/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */
function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback
): Polyfill {
  const resizeObserver = getResizeObserver()
  const storedCallback = useLatest(callback)

  useLayoutEffect(() => {
    let didUnsubscribe = false
    const targetEl = target && 'current' in target ? target.current : target
    if (!targetEl) return () => {}

    function cb(entry: ResizeObserverEntry, observer: Polyfill) {
      if (didUnsubscribe) return
      storedCallback.current(entry, observer)
    }

    resizeObserver.subscribe(targetEl as HTMLElement, cb)

    return () => {
      didUnsubscribe = true
      resizeObserver.unsubscribe(targetEl as HTMLElement, cb)
    }
  }, [target, resizeObserver, storedCallback])

  return resizeObserver.observer
}

function createResizeObserver() {
  let ticking = false
  let allEntries: ResizeObserverEntry[] = []

  const callbacks: Map<any, Array<UseResizeObserverCallback>> = new Map()

  const observer = new ResizeObserver(
    (entries: ResizeObserverEntry[], obs: Polyfill) => {
      allEntries = allEntries.concat(entries)
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggered = new Set<Element>()
          for (let i = 0; i < allEntries.length; i++) {
            if (triggered.has(allEntries[i].target)) continue
            triggered.add(allEntries[i].target)
            const cbs = callbacks.get(allEntries[i].target)
            cbs?.forEach((cb) => cb(allEntries[i], obs))
          }
          allEntries = []
          ticking = false
        })
      }
      ticking = true
    }
  )

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target)
      const cbs = callbacks.get(target) ?? []
      cbs.push(callback)
      callbacks.set(target, cbs)
    },
    unsubscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      const cbs = callbacks.get(target) ?? []
      if (cbs.length === 1) {
        observer.unobserve(target)
        callbacks.delete(target)
        return
      }
      const cbIndex = cbs.indexOf(callback)
      if (cbIndex !== -1) cbs.splice(cbIndex, 1)
      callbacks.set(target, cbs)
    },
  }
}

let _resizeObserver: ReturnType<typeof createResizeObserver>

const getResizeObserver = () =>
  !_resizeObserver
    ? (_resizeObserver = createResizeObserver())
    : _resizeObserver

export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: Polyfill
) => any

export default useResizeObserver
