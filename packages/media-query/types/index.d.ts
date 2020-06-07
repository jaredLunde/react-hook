export declare type MediaQueries<T> = {
  [Name in keyof T]: string
}
export declare type Matches<T> = {
  [Name in keyof T]: boolean
}
export interface MediaQueryMatches<T> {
  matches: Matches<T>
  matchesAny: boolean
  matchesAll: boolean
}
export declare const useMediaQueries: <T>(
  queries: MediaQueries<T>
) => MediaQueryMatches<T>
export declare const useMediaQuery: (query: string) => boolean
