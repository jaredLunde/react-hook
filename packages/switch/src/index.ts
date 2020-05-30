import * as React from 'react'

export interface ToggleFn {
  (): void
  on: () => void
  off: () => void
}

const useSwitch = (defaultValue = false): [boolean, ToggleFn] => {
  if (typeof defaultValue !== 'boolean')
    throw new Error(
      `Default value \`${JSON.stringify(defaultValue)}\` was not a boolean`
    )

  const [current, setCurrent] = React.useState(defaultValue)
  return [
    current,
    Object.assign(
      React.useCallback(
        () => setCurrent((curr) => !curr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        emptyArr
      ),
      {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        on: React.useCallback(() => setCurrent(true), emptyArr),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        off: React.useCallback(() => setCurrent(false), emptyArr),
      }
    ),
  ]
}

const emptyArr: [] = []

export default useSwitch
