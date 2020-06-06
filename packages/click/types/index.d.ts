import * as React from 'react'
declare function useClick<T extends HTMLElement = HTMLElement>(
  conditions: string | string[],
  callback: (...args: any[]) => any
): (e: React.MouseEvent<T>) => void
export declare const CLICK_TYPES: {
  readonly single: 'detail=1'
  readonly double: 'detail=2'
  readonly triple: 'detail=3'
  readonly left: 'button=0'
  readonly middle: 'button=1'
  readonly right: 'button=2'
  readonly shift: 'shiftKey'
  readonly control: 'ctrlKey'
  readonly meta: 'metaKey'
  readonly alt: 'altKey'
}
export default useClick
