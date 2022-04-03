import * as React from 'react'

function useMergedRef<T>(...refs: (React.Ref<T> | undefined | null)[]): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      const _refs = refs.filter(Boolean)
      for (let i = 0; i < _refs.length; i++) {
        const ref = _refs[i]
        if (typeof ref === 'function') ref(element)
        else if (ref && typeof ref === 'object')
          (ref as React.MutableRefObject<T>).current = element
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}

export default useMergedRef
