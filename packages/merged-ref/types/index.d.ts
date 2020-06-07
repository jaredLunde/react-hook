import * as React from 'react'
declare const useMergedRef: <T extends unknown>(
  ...refs: React.Ref<T>[]
) => (instance: T | null) => void
export default useMergedRef
