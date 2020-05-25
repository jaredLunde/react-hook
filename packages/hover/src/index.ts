import React, {useRef, useState, useEffect} from 'react'
import useEvent from '@react-hook/event'

export const canHover = (): boolean =>
  typeof window !== 'undefined'
    ? !window.matchMedia('(hover: none)').matches
    : false

type EffectReturn = void | (() => void)

const useHover = (
  enterDelay?: number,
  leaveDelay?: number
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
  const [isHovering, setHovering] = useState<boolean>(false)
  const timeout = useRef<number | undefined>()
  const [element, setElement] = useState<HTMLElement | null>(null)
  const toggle = (value: boolean, delay?: number): void => {
    if (!canHover()) return
    window.clearTimeout(timeout.current)

    if (delay) {
      timeout.current = window.setTimeout(() => setHovering(value), delay)
    } else {
      setHovering(value)
    }
  }

  useEvent(element, 'mouseenter', () => toggle(true, enterDelay))
  useEvent(element, 'mouseleave', () => toggle(false, leaveDelay))

  // cleans up timeout on unmount
  useEffect(
    () => (): void => {
      window.clearTimeout(timeout.current)
    },
    []
  )

  return [isHovering, setElement]
}

export default useHover
