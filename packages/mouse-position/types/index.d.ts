import React from 'react'
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
export declare const useMousePosition: <T extends HTMLElement = HTMLElement>(
  enterDelay?: number,
  leaveDelay?: number,
  fps?: number
) => [MousePosition, React.Dispatch<React.SetStateAction<T | null>>]
export default useMousePosition
