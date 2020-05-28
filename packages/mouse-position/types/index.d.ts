import * as React from 'react'
declare function useMouse<T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T> | T | null,
  options?: UseMouseOptions
): MousePosition
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
