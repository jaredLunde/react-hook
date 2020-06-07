import * as React from 'react'

const useCallback = React.useCallback

const useSwitch = (defaultValue = false) => {
  const [current, setCurrent] = React.useState(defaultValue)
  return [
    current,
    Object.assign(
      useCallback(
        () => setCurrent((curr) => !curr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        emptyArr
      ),
      {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        on: useCallback(() => setCurrent(true), emptyArr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        off: useCallback(() => setCurrent(false), emptyArr),
      }
    ),
  ] as const
}

const emptyArr: [] = []

export default useSwitch
