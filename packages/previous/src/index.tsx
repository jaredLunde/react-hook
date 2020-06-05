import * as React from 'react'

const usePrevious = <T extends any>(value: T, initialValue?: T) => {
  const storedValue = React.useRef<T | undefined>(initialValue)
  React.useEffect(() => {
    storedValue.current = value
  }, [value])
  return storedValue.current
}

export default usePrevious
