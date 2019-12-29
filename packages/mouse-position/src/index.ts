import {useState, useRef, useCallback, useEffect} from 'react'
import {useThrottleCallback} from '@react-hook/throttle'

export interface MousePosition {
  x: number | null
  y: number | null
  pageX: number | null
  pageY: number | null
  clientX: number | null
  clientY: number | null
  screenX: number | null
  screenY: number | null
  elementWidth: number | null
  elementHeight: number | null
  isOver: boolean
}

const initialState: MousePosition = {
  x: null,
  y: null,
  pageX: null,
  pageY: null,
  clientX: null,
  clientY: null,
  screenX: null,
  screenY: null,
  elementWidth: null,
  elementHeight: null,
  isOver: false,
}

export const useMousePosition = (
  enterDelay = 0,
  leaveDelay = 0,
  fps = 30
): [MousePosition, (element: HTMLElement) => void] => {
  const [state, setState] = useState<MousePosition>(initialState),
    entered = useRef(false),
    [element, setElement] = useState<HTMLElement | null>(null),
    timeout = useRef<number | undefined>()

  const delay = (amt, fn): void => {
    timeout.current && window.clearTimeout(timeout.current)

    if (amt) {
      timeout.current = window.setTimeout(fn, amt)
    } else {
      fn()
    }
  }

  const onMove_ = useCallback(
    (e: MouseEvent): void => {
      if (!element) return
      const {clientX, clientY, screenX, screenY, pageX = 0, pageY = 0} = e,
        rect = element.getBoundingClientRect()

      setState({
        x: pageX - rect.left - (window.pageXOffset || window.scrollX),
        y: pageY - rect.top - (window.pageYOffset || window.scrollY),
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementWidth: rect.width,
        elementHeight: rect.height,
        isOver: true,
      })
    },
    [element]
  )

  const onMove = useThrottleCallback(onMove_, fps, true)

  useEffect((): void | (() => void) => {
    if (element !== null) {
      const onEnter = (e: MouseEvent): void => {
        delay(enterDelay, (): void => {
          entered.current = true
          onMove(e)
        })
      }
      const onLeave = (): void => {
        delay(leaveDelay, (): void => {
          entered.current = false
          setState(initialState)
        })
      }

      element.addEventListener('mouseenter', onEnter)
      element.addEventListener('mousemove', onMove)
      element.addEventListener('mouseleave', onLeave)
      element.addEventListener('touchstart', onEnter)
      element.addEventListener('touchmove', onMove)
      element.addEventListener('touchend', onLeave)

      return (): void => {
        timeout.current !== null && window.clearTimeout(timeout.current)
        timeout.current = undefined

        if (element !== null) {
          element.removeEventListener('mouseenter', onEnter)
          element.removeEventListener('mousemove', onMove)
          element.removeEventListener('mouseleave', onLeave)
          element.removeEventListener('touchstart', onEnter)
          element.removeEventListener('touchmove', onMove)
          element.removeEventListener('touchend', onLeave)
        }
      }
    }
  }, [element, enterDelay, leaveDelay, onMove])

  return [state, setElement]
}

export default useMousePosition
