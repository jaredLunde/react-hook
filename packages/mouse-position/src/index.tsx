import * as React from 'react'
import useEvent from '@react-hook/event'
import {useThrottleCallback} from '@react-hook/throttle'

function useMouse<T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseMouseOptions = {}
): MousePosition {
  const {fps = 30, enterDelay = 0, leaveDelay = 0} = options
  const [state, dispatch] = React.useReducer<
    React.Reducer<UseMouseState, UseMouseAction<T>>
  >(
    (state, action): UseMouseState => {
      const {mouse, context} = state
      const handleDown = (
        state: UseMouseState,
        action:
          | TouchdownAction<T>
          | MousedownAction<T>
          | MousemoveAction<T>
          | TouchmoveAction<T>
      ): UseMouseState => {
        if (typeof window === 'undefined') return state
        const {event: e, element} = action
        let event: MouseEvent | TouchEvent['touches'][0]
        if ('touches' in e) {
          event = (e as TouchEvent).touches[0]
        } else {
          event = e
        }
        const {clientX, clientY, screenX, screenY, pageX = 0, pageY = 0} = event
        const rect = element.getBoundingClientRect()
        const x = pageX - rect.left - (window.pageXOffset || window.scrollX)
        const y = pageY - rect.top - (window.pageYOffset || window.scrollY)
        // shims a mouseleave event for touch devices
        if (
          'touches' in e &&
          (x < 0 || y < 0 || x > rect.width || y > rect.height)
        ) {
          return {
            ...state,
            context: {
              ...state.context,
              hoverStatus: 'leave',
              touchStatus: 'end',
            },
          }
        }

        return {
          context: {
            ...state.context,
            hoverStatus: 'enter',
          },
          mouse: {
            ...state.mouse,
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
            isTouch: 'touches' in e,
          },
        }
      }

      if (action.type === 'mousemove') {
        // Bails out if touch has ended
        if (context.touchStatus === 'end') return state
        return handleDown(state, action)
      } else if (action.type === 'touchmove') {
        const nextState: UseMouseState = {
          context: {
            ...context,
            touchStatus: 'start',
          },
          mouse,
        }

        return handleDown(nextState, action)
      } else if (action.type === 'touchdown') {
        const nextState: UseMouseState = {
          context: {
            ...context,
            touchStatus: 'start',
          },
          mouse: {
            ...mouse,
            isDown: true,
          },
        }

        return handleDown(nextState, action)
      } else if (action.type === 'mousedown') {
        return {
          context,
          mouse: {
            ...mouse,
            isDown: true,
          },
        }
      } else if (action.type === 'mouseup') {
        return {context, mouse: {...mouse, isDown: false}}
      } else if (action.type === 'mouseleave') {
        return {
          context: {
            ...context,
            hoverStatus: 'leave',
          },
          mouse: {...mouse, isOver: false},
        }
      } else if (action.type === 'touchleave') {
        return {
          context: {...context, hoverStatus: 'leave', touchStatus: 'end'},
          mouse: {...mouse, isOver: false, isDown: false},
        }
      } else if (action.type === 'activeStatus') {
        return {
          context: {...context, activeStatus: action.value},
          mouse,
        }
      }

      return state
    },
    {
      mouse: initialState,
      context: initialContext,
    }
  )

  const onMove = useThrottleCallback(
    (event: MouseEvent | TouchEvent) => {
      const element = target && 'current' in target ? target.current : target
      if (!element) return
      dispatch({type: 'mousemove', event, element})
    },
    fps,
    true
  )
  const onTouchMove = useThrottleCallback(
    (event: MouseEvent | TouchEvent) => {
      const element = target && 'current' in target ? target.current : target
      if (!element) return
      dispatch({type: 'touchmove', event, element})
    },
    fps,
    true
  )
  const onLeave = useThrottleCallback(
    () => dispatch({type: 'mouseleave'}),
    fps,
    // This has to be false because we always want this callback to fire after any
    // move events.
    false
  )
  const onDown = useThrottleCallback(
    (event: MouseEvent | TouchEvent) => {
      const element = target && 'current' in target ? target.current : target
      if (!element) return
      dispatch(
        'touches' in event
          ? {
              type: 'touchdown',
              element,
              event: event,
            }
          : {
              type: 'mousedown',
              element,
              event: event,
            }
      )
    },
    fps,
    true
  )
  const onUp = useThrottleCallback(
    () => dispatch({type: 'mouseup'}),
    fps,
    // This has to be false because we always want this callback to fire after any
    // down events.
    false
  )
  const onTouchEnd = useThrottleCallback(
    () => dispatch({type: 'touchleave'}),
    fps,
    // This has to be false because we always want this callback to fire after any
    // move events.
    false
  )

  useEvent(target, 'mouseenter', onMove)
  useEvent(target, 'mousemove', onMove)
  useEvent(target, 'mouseleave', onLeave)
  useEvent(target, 'mousedown', onDown)
  useEvent(typeof window !== 'undefined' ? window : null, 'mousedown', onDown)
  useEvent(typeof window !== 'undefined' ? window : null, 'mouseup', onUp)
  useEvent(target, 'touchstart', onDown)
  useEvent(target, 'touchmove', onTouchMove)
  useEvent(target, 'touchend', onTouchEnd)
  useEvent(target, 'touchcancel', onTouchEnd)

  React.useEffect(() => {
    if (state.context.hoverStatus === 'enter') {
      if (enterDelay) {
        const timeout = setTimeout(
          () => dispatch({type: 'activeStatus', value: 'active'}),
          enterDelay
        )
        return () => clearTimeout(timeout)
      }

      dispatch({type: 'activeStatus', value: 'active'})
    } else {
      if (leaveDelay) {
        const timeout = setTimeout(
          () => dispatch({type: 'activeStatus', value: 'inactive'}),
          leaveDelay
        )
        return () => clearTimeout(timeout)
      }

      dispatch({type: 'activeStatus', value: 'inactive'})
    }
  }, [state.context.hoverStatus, enterDelay, leaveDelay])

  return state.context.activeStatus === 'active' ? state.mouse : initialState
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
  isTouch: false,
}

const initialContext: UseMouseState['context'] = {
  hoverStatus: 'idle',
  touchStatus: 'idle',
  activeStatus: 'inactive',
}

interface UseMouseState {
  mouse: MousePosition
  context: {
    hoverStatus: 'idle' | 'enter' | 'leave'
    touchStatus: 'idle' | 'start' | 'end'
    activeStatus: 'inactive' | 'active'
  }
}

type UseMouseAction<T extends HTMLElement> =
  | MousemoveAction<T>
  | {
      type: 'activeStatus'
      value: UseMouseState['context']['activeStatus']
    }
  | {
      type: 'mouseleave'
    }
  | {
      type: 'touchleave'
    }
  | {
      type: 'mouseup'
    }
  | TouchdownAction<T>
  | MousedownAction<T>
  | TouchmoveAction<T>

type TouchdownAction<T> = {
  type: 'touchdown'
  element: T
  event: TouchEvent
}

type MousedownAction<T> = {
  type: 'mousedown'
  element: T
  event: MouseEvent
}

type MousemoveAction<T> = {
  type: 'mousemove'
  element: T
  event: MouseEvent | TouchEvent
}

type TouchmoveAction<T> = {
  type: 'touchmove'
  element: T
  event: MouseEvent | TouchEvent
}

export interface UseMouseOptions {
  enterDelay?: number
  leaveDelay?: number
  fps?: number
}

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
  isTouch: boolean
}

export default useMouse
