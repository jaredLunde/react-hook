import * as React from 'react'

function useMergedRef<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return React.useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (typeof ref === 'function') ref(element)
        else if (ref && typeof ref === 'object')
          (ref as React.MutableRefObject<T>).current = element
      }),
    refs
  )
}

export default useMergedRef
