import {useEffect, useLayoutEffect} from 'react'

const usePassiveLayoutEffect =
  typeof window !== 'undefined' && window.document?.createElement !== void 0
    ? useLayoutEffect
    : useEffect

export default usePassiveLayoutEffect
