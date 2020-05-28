import * as React from 'react'
import useEvent from '@react-hook/event'

const useHover = <T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseHoverOptions = {}
): boolean => {
  const {enterDelay, leaveDelay} = options
  const [state, dispatch] = React.useReducer<
    React.Reducer<UseHoverState, UseHoverAction>
  >(
    (state, action) => {
      if (!canHover()) return state

      if (action.type === 'setStatus') {
        window.clearTimeout(state.timeout)
        const {value, force} = action

        if (
          !force &&
          ((value === 'hovering' && enterDelay) ||
            (value === 'idle' && leaveDelay))
        ) {
          return {
            ...state,
            timeout: window.setTimeout(
              () => dispatch({type: 'setStatus', value, force: true}),
              enterDelay
            ),
          }
        }

        return {...state, timeout: void 0, status: value}
      }

      return state
    },
    {status: 'idle', timeout: void 0}
  )

  useEvent(target, 'mouseenter', () =>
    dispatch({type: 'setStatus', value: 'hovering'})
  )
  useEvent(target, 'mouseleave', () =>
    dispatch({type: 'setStatus', value: 'idle'})
  )

  // Cleans up timeout on unmount
  React.useEffect(
    () => (): void => {
      window.clearTimeout(state.timeout)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return state.status === 'hovering'
}

export const canHover = (): boolean =>
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
