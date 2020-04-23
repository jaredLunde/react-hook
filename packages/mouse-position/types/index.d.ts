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
export declare const useMousePosition: (
  enterDelay?: number,
  leaveDelay?: number,
  fps?: number
) => [MousePosition, React.Dispatch<React.SetStateAction<HTMLElement | null>>]
export default useMousePosition
