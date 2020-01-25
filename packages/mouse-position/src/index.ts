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
  isDown: boolean
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
  isDown: false,
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
      if (!element || !entered.current) return
      const {clientX, clientY, screenX, screenY, pageX = 0, pageY = 0} = e,
        rect = element.getBoundingClientRect()

      setState(prev => ({
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
        isDown: prev.isDown,
      }))
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
      const onDown = (): void => {
        delay(enterDelay, (): void => {
          entered.current = true
          setState(prev => ({...prev, isDown: true}))
        })
      }
      const onUp = (): void => {
        delay(leaveDelay, (): void => {
          entered.current = false
          setState(prev => ({...prev, isDown: false}))
        })
      }

      const addEvent = element.addEventListener.bind(element)
      addEvent('mouseenter', onEnter)
      addEvent('mousemove', onMove)
      addEvent('mouseleave', onLeave)
      addEvent('mousedown', onDown)
      addEvent('mouseup', onUp)
      addEvent('touchstart', onEnter)
      addEvent('touchstart', onDown)
      addEvent('touchmove', onMove)
      addEvent('touchend', onLeave)

      return (): void => {
        timeout.current !== null && window.clearTimeout(timeout.current)
        timeout.current = undefined

        if (element !== null) {
          const removeEvent = element.removeEventListener.bind(element)
          removeEvent('mouseenter', onEnter)
          removeEvent('mousemove', onMove)
          removeEvent('mouseleave', onLeave)
          removeEvent('mousedown', onDown)
          removeEvent('mouseup', onUp)
          removeEvent('touchstart', onEnter)
          removeEvent('touchstart', onDown)
          removeEvent('touchmove', onMove)
          removeEvent('touchend', onLeave)
        }
      }
    }
  }, [element, enterDelay, leaveDelay, onMove])

  return [state, setElement]
}

export default useMousePosition
