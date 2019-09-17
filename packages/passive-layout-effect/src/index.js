import {useEffect, useLayoutEffect} from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window.document?.createElement !== void 0
    ? useLayoutEffect
    : useEffect

export default useIsomorphicLayoutEffect
