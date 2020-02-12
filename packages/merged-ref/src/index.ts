import {useCallback, MutableRefObject} from 'react'

const setRef = <T>(ref: ReactRef<T>, value: T): void => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && typeof ref === 'object') {
    ref.current = value
  }
}

export type CallbackRef<T> = (element: T) => void
export type ReactRef<T> =
  | CallbackRef<T | null>
  | MutableRefObject<T | null>
  | null

const useMergedRef = <T = any>(...args: ReactRef<T>[]): CallbackRef<T> =>
  useCallback((element: T): void => {
    if (args.length === 2) {
      setRef(args[0], element)
      setRef(args[1], element)
    } else {
      for (let i = 0; i < args.length; i++) setRef(args[i], element)
    }
  }, args)

export default useMergedRef
