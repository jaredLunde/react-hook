import {useCallback} from 'react'

const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null) {
    ref.current = value
  }
}

type ReactRef = {}

const useMergedRef = (...args) => {
  return useCallback(element => {
    if (args.length === 2) {
      setRef(args[0], element)
      setRef(args[1], element)
    } else {
      for (let ref of args) setRef(ref, element)
    }
  }, args)
}

export default useMergedRef
