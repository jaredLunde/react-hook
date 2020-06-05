import * as React from 'react'

function usePrevious<T extends any>(value: T, initialValue: T): T
function usePrevious<T extends any>(value: T): T | undefined
function usePrevious<T extends any>(value: T, initialValue?: T): T | undefined {
  const storedValue = React.useRef(initialValue)
  React.useEffect(() => {
    storedValue.current = value
  }, [value])
  return storedValue.current
}

export default usePrevious
