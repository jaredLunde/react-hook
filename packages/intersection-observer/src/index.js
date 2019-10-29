if (typeof window !== 'undefined') {
  require('intersection-observer')
}
import {useEffect, useRef, useState} from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'

const useIntersectionObserver = (opt = {}) => {
  const {
    root = null,
    pollInterval = null,
    useMutationObserver = false,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0,
    initialIsIntersecting = false
  } = opt
  const
    didMount = useRef(null),
    [element, setElement] = useState(null),
    [entry, setEntry] = useState(() => ({
      boundingClientRect: null,
      intersectionRatio: 0,
      intersectionRect: null,
      isIntersecting: initialIsIntersecting,
      rootBounds: null,
      target: null,
      time: null
    })),
    createObserver = () => {
      if (typeof IntersectionObserver === 'undefined') return null
      const observer = new IntersectionObserver(
        entries => setEntry(entries[entries.length - 1]),
        {root, rootMargin, threshold}
      )
      observer.POLL_INTERVAL = pollInterval
      observer.USE_MUTATION_OBSERVER = useMutationObserver
      return observer
    },
    [observer, setObserver] = useState(createObserver)

  useEffect(
    () => {
      if (didMount.current === false)
        didMount.current = true
      else
        setObserver(createObserver())
      return () => didMount.current === true && observer.disconnect()
    },
    [
      root,
      rootMargin,
      pollInterval,
      useMutationObserver,
      ...(Array.isArray(threshold) === true ? threshold : [threshold]),
    ]
  )

  useLayoutEffect(
    () => {
      element && observer.observe(element)
      return () => element && observer.unobserve(element)
    },
    [element, observer]
  )

  return [entry, setElement]
}

export default useIntersectionObserver