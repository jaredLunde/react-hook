import {useRef, useState, useMemo, useEffect, useCallback} from 'react'

export const canHover = (): boolean =>
  typeof window !== 'undefined'
    ? !window.matchMedia('(hover: none)').matches
    : false
const emptyArr = []

type EffectReturn = void | (() => void)

const useHover = (
  enterDelay?: number,
  leaveDelay?: number
): [boolean, (element: HTMLElement | null) => void] => {
  const [isHovering, setHovering] = useState<boolean>(false)
  const timeout = useRef<number | undefined>()
  const [element, setElement] = useState<HTMLElement | null>(null)
  const hasHover = useMemo(canHover, [])
  // here for compatibility reasons with certain libs
  const toggle = useCallback((value, delay) => {
    if (!hasHover) return

    if (timeout.current !== null) {
      window.clearTimeout(timeout.current)
      timeout.current = void 0
    }

    if (delay) {
      timeout.current = window.setTimeout(() => setHovering(value), delay)
    } else {
      setHovering(value)
    }
  }, emptyArr)

  const onEnter = useCallback(() => toggle(true, enterDelay), [
    enterDelay,
    toggle,
  ])

  const onLeave = useCallback(() => toggle(false, leaveDelay), [
    leaveDelay,
    toggle,
  ])

  useEffect((): EffectReturn => {
    if (element !== null) {
      element.addEventListener('mouseenter', onEnter)
      element.addEventListener('mouseleave', onLeave)

      return (): void => {
        element.removeEventListener('mouseenter', onEnter)
        element.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [element, onEnter, onLeave])
  // cleans up timeout on unmount
  useEffect(
    () => (): void => {
      timeout.current !== null && window.clearTimeout(timeout.current)
    },
    emptyArr
  )

  return [isHovering, setElement]
}

export default useHover
