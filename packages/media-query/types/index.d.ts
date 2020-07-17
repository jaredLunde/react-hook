/**
 * A hook that returns a [`MediaQueryMatches`](#mediaquerymatches) object which will
 * tell you if specific media queries matched, all media queries matched, or
 * any media queries matched. Matches in this hook will always return `false` when
 * rendering on the server.
 *
 * @param queryMap The media queries you want to match against e.g. `{screen: "screen", width: "(min-width: 12em)"}`
 */
export declare function useMediaQueries<T>(
  queryMap: MediaQueries<T>
): MediaQueryMatches<T>
/**
 * A hook that returns `true` if the media query matched and `false` if not. This
 * hook will always return `false` when rendering on the server.
 *
 * @param query The media query you want to match against e.g. `"only screen and (min-width: 12em)"`
 */
export declare function useMediaQuery(query: string): boolean
export declare type MediaQueries<T> = {
  [Name in keyof T]: string
}
export declare type Matches<T> = {
  [Name in keyof T]: boolean
}
export interface MediaQueryMatches<T> {
  /**
   * Returns a map of query key/didMatch pairs
   */
  matches: Matches<T>
  /**
   * `true` if any of the media queries matched
   */
  matchesAny: boolean
  /**
   * `true` if all of the media queries matched
   */
  matchesAll: boolean
}
