import * as React from 'react'

const useMergedRef = <T extends any>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> => (element: T) =>
  refs.forEach((ref) => {
    if (typeof ref === 'function') ref(element)
    else if (ref && typeof ref === 'object')
      (ref as React.MutableRefObject<T>).current = element
  })

export default useMergedRef
