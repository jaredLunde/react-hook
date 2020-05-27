import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import useLayoutEffect from '@react-hook/passive-layout-effect'

/**
 * A React hook for measuring the size of HTML elements including when they change
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param options Configures the initial width and initial height of the hook's state
 */
const useSize = <T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options?: UseSizeOptions
): [number, number] => {
  const [size, setSize] = React.useState<[number, number]>(() => {
    const targetEl = target && 'current' in target ? target.current : target
    const initialRect = targetEl
      ? targetEl.getBoundingClientRect()
      : {width: options?.initialWidth ?? 0, height: options?.initialHeight ?? 0}
    return [initialRect.width, initialRect.height]
  })

  useLayoutEffect(() => {
    const targetEl = target && 'current' in target ? target.current : target
    if (!targetEl) return
    const rect = targetEl.getBoundingClientRect()
    setSize([rect.width, rect.height])
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    const {width, height} = entry.contentRect
    setSize([width, height])
  })

  return size
}

export interface UseSizeOptions {
  // The initial width to set into state.
  // This is useful for SSR environments.
  initialWidth: 0
  // The initial height to set into state.
  // This is useful for SSR environments.
  initialHeight: 0
}

export default useSize
