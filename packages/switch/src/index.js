import {useState, useCallback} from 'react'

const emptyArr = []
export default (defaultValue = false) => {
  if (defaultValue !== false && defaultValue !== true)
    throw new Error(
      `Default value \`${JSON.stringify(
        defaultValue
      )}\` did not match one of: ` +
        `\`${JSON.stringify(false)}\`, \`${JSON.stringify(true)}\``
    )

  const [current, setCurrent] = useState(defaultValue)
  const toggle = useCallback(() => setCurrent(curr => curr !== true), emptyArr)
  toggle.on = useCallback(() => setCurrent(true), emptyArr)
  toggle.off = useCallback(() => setCurrent(false), emptyArr)
  return [current, toggle]
}
