import {useRef, useMemo, useEffect, useCallback, useState} from 'react'

export const canHover = (): boolean =>
  typeof window !== 'undefined'
    ? !window.matchMedia('(hover: none)').matches
    : false
const emptyArr = []

type EffectReturn = void | (() => void)

const useHover = (
  enterDelay?: number,
  leaveDelay?: number
): [boolean, {current: HTMLElement | null}] => {
  const [isHovering, setHovering] = useState(false)
  const timeout = useRef<number | null>(null)
  const element = useRef<HTMLElement | null>(null)
  const hasHover = useMemo(canHover, [])
  // here for compatibility reasons with certain libs
  const toggle = useCallback((value, delay) => {
    if (!hasHover) return

    if (timeout.current !== null) {
      window.clearTimeout(timeout.current)
      timeout.current = null
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
    const el = element.current
    if (el !== null) {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return (): void => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [element.current, onEnter, onLeave])
  // cleans up timeout on unmount
  useEffect(
    () => (): void => {
      timeout.current !== null && window.clearTimeout(timeout.current)
    },
    emptyArr
  )

  return [isHovering, element]
}

export default useHover
