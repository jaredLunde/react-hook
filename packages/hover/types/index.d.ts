import * as React from 'react'
declare function useHover<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options?: UseHoverOptions
): boolean
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
