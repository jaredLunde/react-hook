import {useEffect, useState} from 'react'

// Usage:
// const Page = useGoogleOptimize('hhWP8gOsTvvT2P_KlFjw', [PageA, PageB])
// return <Page/>
function useGoogleOptimize<T>(
  experimentId: string,
  variants: T[],
  timeout = Infinity
): T | null {
  const [variant, setVariant] = useState<null | number>(null)

  useEffect(
    () => {
      // Sets a timeout
      let optimizeTimedOut

      if (timeout !== Infinity) {
        optimizeTimedOut = setTimeout(() => {
          // Clears the callback just in case this was a network timeout
          removeCallback()
          // Defaults to the 'Original'
          setVariant(0)
        }, timeout)
      }
      // Sets the variant returned by Optimize and clears the timeout check
      const callback = value => {
        optimizeTimedOut && clearTimeout(optimizeTimedOut)
        setVariant(Number(value))
      }
      // Documented here:
      // https://support.google.com/optimize/answer/9059383?hl=en
      window.gtag('event', 'optimize.callback', {
        name: experimentId,
        callback,
      })
      // Cleans up the optimize callback if the request times out
      const removeCallback = () =>
        window.gtag('event', 'optimize.callback', {
          name: experimentId,
          callback,
          remove: true,
        })
      // Unregisters the event when the parent is unmounted or the experiment
      // id is changed
      return removeCallback
    },
    // Only update if the experiment ID changes
    [experimentId]
  )
  // When testing functions you should use null checks. No special treatment
  // is necessary with React components.
  return variant === null ? null : variants[variant]
}

export default useGoogleOptimize
