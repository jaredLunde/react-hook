import {useState, useRef, useCallback, useEffect} from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'
import {canHover} from '@react-hook/hover'
import {useThrottleCallback} from '@react-hook/throttle'


const
  emptyArr = [],
  initialState = {
    pageX: null,
    pageY: null,
    clientX: null,
    clientY: null,
    screenX: null,
    screenY: null,
    elementX: null,
    elementY: null,
    elementWidth: null,
    elementHeight: null,
    isOver: false
  }

export const useMousePosition = (enterDelay = 0, leaveDelay = 0, fps = 30) => {
  const
    [state, setState] = useState(initialState),
    entered = useRef(false),
    element = useRef(null),
    timeout = useRef(null)

  const delay = useCallback(
    (amt, fn) => {
      if (!canHover) return
      timeout.current !== null && clearRequestTimeout(timeout.current)

      if (amt) {
        timeout.current = requestTimeout(fn, amt)
      } else {
        fn()
      }
    },
    emptyArr
  )

  const _onMove = useCallback(
    e => {
      if (canHover === false || entered.current === false) return
      const
        {clientX, clientY, screenX, screenY, pageX, pageY} = e,
        rect = element.current.getBoundingClientRect()

      setState({
        x: pageX - rect.left - window.pageXOffset,
        y: pageY - rect.top - window.pageYOffset,
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementWidth: rect.width,
        elementHeight: rect.height,
        isOver: true
      })
    },
    emptyArr
  )

  const onMove = useThrottleCallback(_onMove, fps, true)
  const onEnter = useCallback(
    e => delay(
      enterDelay,
      () => {
        entered.current = true
        onMove(e)
      }
    ),
    [enterDelay, delay]
  )

  const onLeave = useCallback(
    () => delay(
      leaveDelay,
      () => {
        entered.current = false
        setState(initialState)
      }
    ),
    [leaveDelay, delay]
  )

  useEffect(
    () => {
      if (element.current !== null) {
        element.current.addEventListener('mouseenter', onEnter)
        element.current.addEventListener('mousemove', onMove)
        element.current.addEventListener('mouseleave', onLeave)
      }

      return () => {
        timeout.current !== null && clearRequestTimeout(timeout.current)
        timeout.current = null

        if (element.current !== null) {
          element.current.removeEventListener('mouseenter', onEnter)
          element.current.removeEventListener('mousemove', onMove)
          element.current.removeEventListener('mouseleave', onLeave)
        }
      }
    },
    [element.current, onEnter, onLeave, onMove]
  )

  return [element, state]
}

export default useMousePosition