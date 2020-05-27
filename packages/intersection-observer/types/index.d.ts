import 'intersection-observer'
import * as React from 'react'
declare const useIntersectionObserver: <T extends HTMLElement = HTMLElement>(
  target: T | React.RefObject<T> | null,
  options?: IntersectionObserverOptions
) => MockIntersectionObserverEntry | IntersectionObserverEntry
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
