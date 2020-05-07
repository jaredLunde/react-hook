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
      let optimizeTimedOut: ReturnType<typeof setTimeout>

      if (timeout !== Infinity) {
        optimizeTimedOut = setTimeout(() => {
          // Clears the callback just in case this was a network timeout
          removeCallback()
          // Defaults to the 'Original'
          setVariant(0)
        }, timeout)
      }
      // Sets the variant returned by Optimize and clears the timeout check
      const callback = (value: number) => {
        optimizeTimedOut && clearTimeout(optimizeTimedOut)
        setVariant(Number(value))
      }
      // Documented here:
      // https://support.google.com/optimize/answer/9059383?hl=en
      gtag('event', 'optimize.callback', {
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

declare global {
  interface Window {
    dataLayer: any[]
  }
}

const gtag = (...args: Parameters<typeof window.gtag>) => {
  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      window.gtag(...args)
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(args)
    } else {
      if (
        typeof process !== 'undefined' &&
        process.env.NODE_ENV !== 'production' &&
        !didWarn
      ) {
        didWarn = true
        console.warn(
          '[@react-hook/google-optimize] Google Tag Manager was not found on your site. Neither "gtag()" or "dataLayer[]" could be located on the "window". If you are not using Google Tag Manager in dev you can ignore this warning. Otherwise, see the Google Tag Manager dev guide for examples: https://developers.google.com/tag-manager/devguide'
        )
      }
    }
  }
}

let didWarn = false

export default useGoogleOptimize
