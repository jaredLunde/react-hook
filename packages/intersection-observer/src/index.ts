import 'intersection-observer'
import * as React from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'

const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: IntersectionObserverOptions = {}
): MockIntersectionObserverEntry | IntersectionObserverEntry => {
  const targetEl = target && 'current' in target ? target.current : target
  const {
    root = null,
    pollInterval = null,
    useMutationObserver = false,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0,
    initialIsIntersecting = false,
  } = options
  const [entry, setEntry] = React.useState<
    IntersectionObserverEntry | MockIntersectionObserverEntry
  >(() => ({
    boundingClientRect: null,
    intersectionRatio: 0,
    intersectionRect: null,
    isIntersecting: initialIsIntersecting,
    rootBounds: null,
    target: null,
    time: 0,
  }))
  const createObserver = (): null | IntersectionObserver => {
    if (typeof IntersectionObserver === 'undefined') return null
    const observer = new IntersectionObserver(
      (entries) => setEntry(entries[entries.length - 1]),
      {root, rootMargin, threshold}
    )
    // @ts-ignore
    observer.POLL_INTERVAL = pollInterval
    // @ts-ignore
    observer.USE_MUTATION_OBSERVER = useMutationObserver
    return observer
  }
  const [observer, setObserver] = React.useState(createObserver)

  React.useEffect((): (() => void) => {
    const observer = createObserver()
    setObserver(observer)
    return (): void => {
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    root,
    rootMargin,
    pollInterval,
    useMutationObserver,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...(Array.isArray(threshold) === true ? threshold : [threshold]),
  ])

  useLayoutEffect(() => {
    targetEl && observer && observer.observe(targetEl)
    return (): void => {
      targetEl && observer && observer.unobserve(targetEl)
    }
  }, [targetEl, observer])

  return entry
}

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

export default useIntersectionObserver
