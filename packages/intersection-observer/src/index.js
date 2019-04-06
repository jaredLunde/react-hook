if (typeof window !== 'undefined') {
  require('intersection-observer')
}
import {useEffect, useRef, useState} from 'react'


const empty = {}
const _memo = {}
const memoize = fn => initialIsIntersecting => {
  if (_memo[initialIsIntersecting] === void 0)
    _memo[initialIsIntersecting] = fn(initialIsIntersecting)
  return _memo[initialIsIntersecting]
}
const setInitialState = memoize(
  initialIsIntersecting => () => ({
    boundingClientRect: null,
    intersectionRatio: 0,
    intersectionRect: null,
    isIntersecting: initialIsIntersecting,
    rootBounds: null,
    target: null,
    time: null
  })
)

export default (opt = empty) => {
  const {
    root = null,
    pollInterval = null,
    useMutationObserver = false,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0,
    initialIsIntersecting = false
  } = opt
  const
    element = useRef(null),
    observer = useRef(null),
    [state, setState] = useState(setInitialState(initialIsIntersecting))

  useEffect(
    () => {
      observer.current = new IntersectionObserver(
        entries => setState(entries[entries.length - 1]),
        {root, rootMargin, threshold}
      )

      observer.current.POLL_INTERVAL = pollInterval
      observer.current.USE_MUTATION_OBSERVER = useMutationObserver
      return () => observer.current.disconnect()
    },
    [
      root,
      rootMargin,
      pollInterval,
      useMutationObserver,
      ...(Array.isArray(threshold) === true ? threshold : [threshold]),
    ]
  )

  useEffect(
    () => {
      element.current && observer.current.observe(element.current)
      return () => element.current && observer.current.unobserve(element.current)
    },
    [element.current, observer.current]
  )

  return [element, state]
}