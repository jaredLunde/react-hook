import {useState, useCallback} from 'react'
export default (offValue = false, onValue = true, defaultValue = offValue) => {
  if (defaultValue !== offValue && defaultValue !== onValue)
    throw new Error(
      `Default value \`${JSON.stringify(
        defaultValue
      )}\` did not match one of: ` +
        `\`${JSON.stringify(offValue)}\`, \`${JSON.stringify(onValue)}\``
    )

  const [current, setCurrent] = useState(defaultValue)
  const on = useCallback(() => setCurrent(onValue), [onValue])
  const off = useCallback(() => setCurrent(offValue), [offValue])
  const toggle = useCallback(
    () => setCurrent(curr => (curr === onValue ? offValue : onValue)),
    [onValue, offValue]
  )
  toggle.on = on
  toggle.off = off
  return [current, toggle]
}
