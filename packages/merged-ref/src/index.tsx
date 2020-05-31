import * as React from 'react'

const useMergedRef = <T extends any = any>(
  ...args: ReactRef<T>[]
): CallbackRef<T> => (element: T) => args.forEach((arg) => setRef(arg, element))

const setRef = <T extends any = any>(ref: ReactRef<T>, value: T): void => {
  if (typeof ref === 'function') ref(value)
  else if (ref && typeof ref === 'object') ref.current = value
}

export type CallbackRef<T> = (element: T) => void
export type ReactRef<T> =
  | CallbackRef<T | null>
  | React.MutableRefObject<T | null>
  | null

export default useMergedRef
