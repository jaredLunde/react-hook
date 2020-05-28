import * as React from 'react'
declare const useHover: <T extends HTMLElement>(
  target: T | React.RefObject<T> | null,
  options?: UseHoverOptions
) => boolean
export declare const canHover: () => boolean
export interface UseHoverOptions {
  enterDelay?: number
  leaveDelay?: number
}
export interface UseHoverState {
  status: 'idle' | 'hovering'
  timeout: number | undefined
}
export declare type UseHoverAction = {
  type: 'setStatus'
  value: 'idle' | 'hovering'
  force?: boolean
}
export default useHover
