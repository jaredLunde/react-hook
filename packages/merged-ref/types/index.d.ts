import * as React from 'react'
declare const useMergedRef: <T extends unknown = any>(
  ...args: ReactRef<T>[]
) => CallbackRef<T>
export declare type CallbackRef<T> = (element: T) => void
export declare type ReactRef<T> =
  | CallbackRef<T | null>
  | React.MutableRefObject<T | null>
  | null
export default useMergedRef
