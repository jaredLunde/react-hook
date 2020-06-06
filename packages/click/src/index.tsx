import * as React from 'react'
import useLatest from '@react-hook/latest'

function useClick<T extends HTMLElement = HTMLElement>(
  conditions: string | string[],
  callback: (...args: any[]) => any
) {
  const storedConditions = useLatest(conditions)
  const storedCallback = useLatest(callback)

  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      if (
        isClickOfType<T>(
          e,
          Array.isArray(storedConditions.current)
            ? storedConditions.current
            : [storedConditions.current]
        ) === true
      ) {
        const {left, top} = (e.target as HTMLElement).getBoundingClientRect()
        storedCallback.current(e, {
          x: e.clientX - Math.floor(left),
          y: e.clientY - Math.floor(top),
          count: e.detail,
        })
      }
    },
    [storedCallback, storedConditions]
  )
}

function isClickOfType<T extends HTMLElement>(
  e: React.MouseEvent<T>,
  types: string[]
) {
  let i = 0
  let j

  for (; i < types.length; i++) {
    const type = types[i]

    if (type.indexOf('|') > -1) {
      const ors = type.split('|').map((o) => o.trim())
      let orSatisfied = true

      for (j = 0; j < ors.length; j++) {
        orSatisfied = isClickOfType(e, [ors[j]])
        if (orSatisfied) break
      }

      if (!orSatisfied) return false
    } else {
      const props = type.split('+')

      for (j = 0; j < props.length; j++) {
        const prop =
          props[j] in CLICK_TYPES
            ? CLICK_TYPES[props[j] as keyof typeof CLICK_TYPES]
            : props[j]
        const [propName, propValue] = prop.split('=')

        if (propValue !== void 0) {
          if (String(e[propName as keyof typeof e]) !== String(propValue)) {
            return false
          }
        } else if (e[propName as keyof typeof e] === false) {
          return false
        }
      }
    }
  }

  return true
}

export const CLICK_TYPES = {
  single: 'detail=1',
  double: 'detail=2',
  triple: 'detail=3',
  left: 'button=0',
  middle: 'button=1',
  right: 'button=2',
  shift: 'shiftKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  alt: 'altKey',
} as const

export default useClick
