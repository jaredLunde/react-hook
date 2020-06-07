declare function useToggle<Off extends any, On extends any>(
  off?: Off,
  on?: On,
  defaultValue?: Off | On
): readonly [Off | On, () => void]
export default useToggle
