import {useRef, useEffect, useCallback, useState} from 'react'


export const canHover =
  typeof window !== 'undefined'
    ? !(window.matchMedia('(hover: none)').matches)
    : false
const emptyArr = []

export default (enterDelay, leaveDelay) => {
  const [isHovering, setHovering] = useState(false)
  const timeout = useRef(null)
  const element = useRef(null)
  // here for compatibility reasons with certain libs
  const setElementRef = useCallback(el => element.current = el, emptyArr)
  const toggle = useCallback(
    (value, delay) => {
      if (canHover === false) {
        return
      }

      if (timeout.current !== null) {
        clearTimeout(timeout.current)
        timeout.current = null
      }

      if (delay) {
        timeout.current = setTimeout(() => setHovering(value), delay)
      } else {
        setHovering(value)
      }
    },
    emptyArr
  )
  const onEnter = useCallback(() => toggle(true, enterDelay), [enterDelay, toggle])
  const onLeave = useCallback(() => toggle(false, leaveDelay), [leaveDelay, toggle])

  useEffect(
    () => {
      if (element.current !== null) {
        element.current.addEventListener('mouseenter', onEnter)
        element.current.addEventListener('mouseleave', onLeave)
      }

      return () => {
        if (element.current !== null) {
          element.current.removeEventListener('mouseenter', onEnter)
          element.current.removeEventListener('mouseleave', onLeave)
        }
      }
    },
    [element.current, onEnter, onLeave]
  )
  // cleans up timeout on unmount
  useEffect(() => () => timeout.current !== null && clearTimeout(timeout.current), emptyArr)
  return [setElementRef, isHovering]
}