import * as React from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'

function useEvent<
  T extends Window = Window,
  K extends keyof WindowEventMap = keyof WindowEventMap
>(target: Window | null, type: K, listener: WindowEventListener<K>): void
function useEvent<
  T extends Document = Document,
  K extends keyof DocumentEventMap = keyof DocumentEventMap
>(target: Document | null, type: K, listener: DocumentEventListener<K>): void
function useEvent<
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: React.RefObject<T> | T | null,
  type: K,
  listener: ElementEventListener<K>
): void
function useEvent(target: any, type: any, listener: any): void {
  const storedListener = React.useRef(listener)
  storedListener.current = listener

  useLayoutEffect(() => {
    const targetEl = target && 'current' in target ? target.current : target
    if (!targetEl) return

    const listener = function (this: any, ...args: any[]) {
      storedListener.current.apply(this, args)
    }

    targetEl.addEventListener(type, listener)

    return () => {
      targetEl.removeEventListener(type, listener)
    }
  }, [target, type])
}

export type ElementEventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any

export type DocumentEventListener<
  K extends keyof DocumentEventMap = keyof DocumentEventMap
> = (this: Document, ev: DocumentEventMap[K]) => any

export type WindowEventListener<
  K extends keyof WindowEventMap = keyof WindowEventMap
> = (this: Document, ev: WindowEventMap[K]) => any

export default useEvent
