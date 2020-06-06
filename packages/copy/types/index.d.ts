declare function useCopy(
  text: string
): {
  readonly copied: boolean
  readonly copy: () => Promise<void>
  readonly reset: () => void
}
export default useCopy
