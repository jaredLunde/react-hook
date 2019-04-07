import {useCallback, useRef, useEffect} from 'react'


const isClickOfType = (e, types) => {
  let i = 0, j

  for (; i < types.length; i++) {
    const type = types[i], ors = type.split('|')

    if (ors.length > 1) {
      let orSatisfied = true

      for (j = 0; j < ors.length; j++) {
        const or = ors[j]

        if (isClickOfType(e, [or]) === true) {
          orSatisfied = true
          break
        } else {
          orSatisfied = false
        }
      }

      if (orSatisfied === false) {
        return false
      }
    } else {
      const props = type.split('+')

      for (j = 0; j < props.length; j++) {
        const [propName, propValue] = props[j].split('=')

        if (propValue !== void 0) {
          if (String(e[propName]) !== String(propValue)) {
            return false
          }
        } else if (e[propName] === false) {
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
  alt: 'altKey'
}

const getClickTypes = types => {
  let clickTypes = [], i = 0

  for (; i < types.length; i++) {
    const alias = CLICK_TYPES[types[i]]
    clickTypes.push(alias === void 0 ? types[i] : alias)
  }

  return clickTypes
}

const emptyArr = []

const useClick = (fn, ...types) => {
  const clickTypes = useRef(emptyArr)
  useEffect(() => { clickTypes.current = getClickTypes(types) }, types)
  return useCallback(
    e => {
      if (isClickOfType(e, clickTypes.current) === true) {
        const {left, top} = e.target.getBoundingClientRect()
        fn(e, {x: e.clientX - Math.floor(left), y: e.clientY - Math.floor(top), count: e.detail})
      }
    },
    [fn]
  )
}

export default useClick