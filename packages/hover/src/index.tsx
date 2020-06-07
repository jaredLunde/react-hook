import * as React from 'react'
import useEvent from '@react-hook/event'

function useHover<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseHoverOptions = {}
): boolean {
  const {enterDelay, leaveDelay} = options
  const timeout = React.useRef<number | undefined>()
  const [hovering, setHovering] = React.useState(false)

  const toggle = (which: boolean) => {
    if (!canHover()) return
    const delay = which ? enterDelay : leaveDelay
    window.clearTimeout(timeout.current)

    if (delay) {
      timeout.current = window.setTimeout(() => setHovering(which), delay)
    } else {
      setHovering(which)
    }
  }

  useEvent(target, 'mouseenter', () => toggle(true))
  useEvent(target, 'mouseleave', () => toggle(false))

  // Cleans up timeout on unmount
  React.useEffect(
    () => () => {
      window.clearTimeout(timeout.current)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return hovering
}

const canHover = (): boolean =>
  typeof window !== 'undefined'
    ? !window.matchMedia('(hover: none)').matches
    : false

export interface UseHoverOptions {
  enterDelay?: number
  leaveDelay?: number
}

export interface UseHoverState {
  status: 'idle' | 'hovering'
  timeout: number | undefined
}

export type UseHoverAction = {
  type: 'setStatus'
  value: 'idle' | 'hovering'
  force?: boolean
}

export default useHover
