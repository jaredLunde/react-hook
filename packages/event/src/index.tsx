import * as React from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'

const useEvent = <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: React.RefObject<T> | Window | Document,
  type: K,
  listener: EventListener<K>
) => {
  const storedListener = React.useRef(listener)
  storedListener.current = listener

  useLayoutEffect(() => {
    const current = 'current' in target ? target.current : target
    if (!current) return

    const listener: EventListener<K> = function (...args) {
      storedListener.current.apply(this, args)
    }

    current.addEventListener(type, listener as any)

    return () => {
      current.removeEventListener(type, listener as any)
    }
  }, [target, type])
}

export type EventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any

export default useEvent
