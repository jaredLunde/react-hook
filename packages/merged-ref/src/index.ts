import {useCallback, MutableRefObject} from 'react'

const setRef = (ref: ReactRef, value: any): void => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && typeof ref === 'object') {
    ref.current = value
  }
}

export interface CallbackRef extends Function {
  (element: any): any | void
}

export type ReactRef = CallbackRef | MutableRefObject<any | unknown> | null

const useMergedRef = (...args: ReactRef[]): CallbackRef =>
  useCallback((element: any): void => {
    if (args.length === 2) {
      setRef(args[0], element)
      setRef(args[1], element)
    } else {
      for (let i = 0; i < args.length; i++) setRef(args[i], element)
    }
  }, args)

export default useMergedRef
