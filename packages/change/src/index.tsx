import * as React from 'react'
import usePrevious from '@react-hook/previous'
import useLatest from '@react-hook/latest'

const useChange = <T extends any>(
  value: T,
  onChange: (current: T, prev: T) => any
) => {
  const storedOnChange = useLatest(onChange)
  const prevValue = usePrevious(value, value)
  React.useEffect(() => {
    if (value !== prevValue) storedOnChange.current(value, prevValue)
  }, [value, prevValue, storedOnChange])
}

export default useChange
