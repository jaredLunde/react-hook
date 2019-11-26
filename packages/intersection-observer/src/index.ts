import 'intersection-observer'
import {useEffect, useRef, useState} from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'

export interface IntersectionObserverOptions {
  root?: HTMLElement | null
  pollInterval?: number | null
  useMutationObserver?: boolean
  rootMargin?: string
  threshold?: number
  initialIsIntersecting?: boolean
}

export interface IntersectionObserverBounds {
  readonly height: number
  readonly width: number
  readonly top: number
  readonly left: number
  readonly right: number
  readonly bottom: number
}

export interface MockIntersectionObserverEntry {
  readonly time: number | null
  readonly rootBounds: IntersectionObserverBounds | null
  readonly boundingClientRect: IntersectionObserverBounds | null
  readonly intersectionRect: IntersectionObserverBounds | null
  readonly intersectionRatio: number | null
  readonly target: HTMLElement | null
  readonly isIntersecting: boolean
}

const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
): [
  MockIntersectionObserverEntry | IntersectionObserverEntry,
  (element: HTMLElement) => void
] => {
  const {
    root = null,
    pollInterval = null,
    useMutationObserver = false,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0,
    initialIsIntersecting = false,
  } = options
  const didMount = useRef<boolean | null>(null),
    [element, setElement] = useState<HTMLElement | null>(null),
    [entry, setEntry] = useState<
      IntersectionObserverEntry | MockIntersectionObserverEntry
    >(() => ({
      boundingClientRect: null,
      intersectionRatio: 0,
      intersectionRect: null,
      isIntersecting: initialIsIntersecting,
      rootBounds: null,
      target: null,
      time: 0,
    })),
    createObserver = (): null | IntersectionObserver => {
      if (typeof IntersectionObserver === 'undefined') return null
      const observer = new IntersectionObserver(
        entries => setEntry(entries[entries.length - 1]),
        {root, rootMargin, threshold}
      )
      // @ts-ignore
      observer.POLL_INTERVAL = pollInterval
      // @ts-ignore
      observer.USE_MUTATION_OBSERVER = useMutationObserver
      return observer
    },
    [observer, setObserver] = useState(createObserver)

  useEffect((): (() => void) => {
    if (didMount.current === false) didMount.current = true
    else setObserver(createObserver())
    const {current} = didMount
    return (): void => {
      current === true && observer && observer.disconnect()
    }
  }, [
    root,
    rootMargin,
    pollInterval,
    useMutationObserver,
    ...(Array.isArray(threshold) === true ? threshold : [threshold]),
  ])

  useLayoutEffect(() => {
    element && observer && observer.observe(element)
    return (): void => {
      element && observer && observer.unobserve(element)
    }
  }, [element, observer])

  return [entry, setElement]
}

export default useIntersectionObserver
