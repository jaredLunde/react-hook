import {useState, useCallback} from 'react'

const emptyArr = []
export interface ToggleFn {
  (): void
  on: () => void
  off: () => void
}

const useSwitch = (defaultValue = false): [boolean, ToggleFn] => {
  if (defaultValue !== false && defaultValue !== true)
    throw new Error(
      `Default value \`${JSON.stringify(
        defaultValue
      )}\` did not match one of: ` +
        `\`${JSON.stringify(false)}\`, \`${JSON.stringify(true)}\``
    )

  const [current, setCurrent] = useState(defaultValue)
  // @ts-ignore
  const toggle: ToggleFn = useCallback(
    () => setCurrent(curr => !curr),
    emptyArr
  )
  toggle.on = useCallback(() => setCurrent(true), emptyArr)
  toggle.off = useCallback(() => setCurrent(false), emptyArr)
  return [current, toggle]
}

export default useSwitch
