declare function useGoogleOptimize<T>(
  experimentId: string,
  variants: T[],
  timeout?: number
): T | null
declare global {
  interface Window {
    dataLayer: any[]
  }
}
export default useGoogleOptimize
