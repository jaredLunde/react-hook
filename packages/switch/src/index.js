import {useState, useCallback} from 'react'

export default (defaultValue = false) => {
  if (defaultValue !== false && defaultValue !== true)
    throw new Error(
      `Default value \`${JSON.stringify(
        defaultValue
      )}\` did not match one of: ` +
        `\`${JSON.stringify(false)}\`, \`${JSON.stringify(true)}\``
    )

  const [current, setCurrent] = useState(defaultValue)
  const toggle = useCallback(() => setCurrent(curr => curr !== true), [
    true,
    false,
  ])
  toggle.on = useCallback(() => setCurrent(true), [true])
  toggle.off = useCallback(() => setCurrent(false), [false])
  return [current, toggle]
}
