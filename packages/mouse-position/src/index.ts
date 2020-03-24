import {
  useState,
  useRef,
  useCallback,
  useEffect,
  // @ts-ignore
  unstable_batchedUpdates,
} from 'react'
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

const batchUpdates =
  typeof unstable_batchedUpdates === 'function'
    ? unstable_batchedUpdates
    : (fn: () => void): void => fn()

export const useMousePosition = (
  enterDelay = 0,
  leaveDelay = 0,
  fps = 30
): [MousePosition, (element: HTMLElement | null) => void] => {
  const [state, setState] = useState<MousePosition>(initialState)
  const [entered, setEntered] = useState<boolean>(false)
  const touchEnded = useRef<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [element, setElement] = useState<HTMLElement | null>(null)
  const onMoveCallback = useThrottleCallback(
    useCallback(
      (e: MouseEvent | TouchEvent): void => {
        let event: MouseEvent | Touch
        const isTouch = typeof (e as TouchEvent).touches !== 'undefined'
        if (isTouch) {
          event = (e as TouchEvent).touches[0]
        } else {
          event = e as MouseEvent
        }

        const {clientX, clientY, screenX, screenY, pageX = 0, pageY = 0} = event
        const rect = (element as HTMLElement).getBoundingClientRect()
        const x = pageX - rect.left - (window.pageXOffset || window.scrollX)
        const y = pageY - rect.top - (window.pageYOffset || window.scrollY)
        // shims a mouseleave event for touch devices
        if (isTouch && (x < 0 || y < 0 || x > rect.width || y > rect.height)) {
          setEntered(false)
          touchEnded.current = true
          return
        }

        setState((prev: MousePosition) => ({
          x,
          y,
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
    ),
    fps,
    true
  )

  useEffect((): void | (() => void) => {
    if (element !== null) {
      const setDown = (): void => setState(prev => ({...prev, isDown: true}))
      const onMove = (e: MouseEvent): void => {
        if (!touchEnded.current) {
          batchUpdates(() => {
            setEntered(true)
            onMoveCallback(e)
          })
        }
      }
      const onLeave = (): void => setEntered(false)
      const onDown = (e: MouseEvent): void => {
        if (!touchEnded.current) {
          batchUpdates(() => {
            setEntered(true)
            onMoveCallback(e)
          })
        }
      }
      const onUp = (): void => setState(prev => ({...prev, isDown: false}))
      const onTouchStart = (e: MouseEvent): void => {
        touchEnded.current = false
        onDown(e)
      }
      const onTouchMove = (e: MouseEvent): void => {
        touchEnded.current = false
        onMoveCallback(e)
      }
      const onTouchEnd = (): void => {
        touchEnded.current = true
        batchUpdates(() => {
          setEntered(false)
          onUp()
        })
      }

      const addEvent = element.addEventListener.bind(element)
      addEvent('mouseenter', onMove)
      addEvent('mousemove', onMove)
      addEvent('mouseleave', onLeave)
      addEvent('mousedown', onDown)
      window.addEventListener('mousedown', setDown)
      window.addEventListener('mouseup', onUp)
      addEvent('touchstart', onTouchStart)
      addEvent('touchmove', onTouchMove)
      addEvent('touchend', onTouchEnd)
      addEvent('touchcancel', onTouchEnd)

      return (): void => {
        const removeEvent = element.removeEventListener.bind(element)
        removeEvent('mouseenter', onMove)
        removeEvent('mousemove', onMove)
        removeEvent('mouseleave', onLeave)
        removeEvent('mousedown', onDown)
        window.removeEventListener('mousedown', setDown)
        window.removeEventListener('mouseup', onUp)
        removeEvent('touchstart', onTouchStart)
        removeEvent('touchmove', onTouchMove)
        removeEvent('touchend', onTouchEnd)
        removeEvent('touchcancel', onTouchEnd)
      }
    }
  }, [element, enterDelay, leaveDelay, onMoveCallback])

  useEffect((): void | (() => void) => {
    if (entered) {
      if (enterDelay) {
        const timeout = setTimeout(() => setActive(true), enterDelay)
        return (): void => clearTimeout(timeout)
      }

      setActive(true)
    } else {
      if (leaveDelay) {
        const timeout = setTimeout(() => setActive(false), leaveDelay)
        return (): void => clearTimeout(timeout)
      }

      setActive(false)
    }
  }, [entered])

  return [active ? state : initialState, setElement]
}

export default useMousePosition
