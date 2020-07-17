import * as React from 'react'

function queriesDidChange(
  prevQueries: MediaQueries<unknown>,
  nextQueries: MediaQueries<unknown>
): boolean {
  if (nextQueries === prevQueries) return false
  const nextQueriesArr = Object.values(nextQueries)
  const prevQueriesArr = Object.values(prevQueries)
  if (nextQueriesArr.length !== prevQueriesArr.length) return true
  if (nextQueriesArr.some((q, i) => q !== prevQueriesArr[i])) return true
  const prevKeys = Object.keys(prevQueries)
  return Object.keys(nextQueries).some((n, i) => n !== prevKeys[i])
}

function init<T>(queries: MediaQueries<T>): State<T> {
  const queryKeys = Object.keys(queries) as (keyof MediaQueries<T>)[]
  /* istanbul ignore next */
  if (typeof window === 'undefined')
    return queryKeys.reduce(
      (curr: State<any>, key) => {
        curr.matches[key] = false
        curr.mediaQueries[key] = {} as MediaQueryList
        return curr
      },
      {mediaQueries: {}, matches: {}}
    )

  return queryKeys.reduce(
    (state: State<any>, name): State<T> => {
      const mql = window.matchMedia(queries[name])
      state.mediaQueries[name] = mql
      state.matches[name] = mql.matches
      return state
    },
    {mediaQueries: {}, matches: {}}
  )
}

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'updateMatches':
      return {
        matches: Object.keys(state.mediaQueries).reduce(
          (prev: Matches<any>, key: string) => {
            prev[key] = state.mediaQueries[key as keyof T].matches
            return prev
          },
          {}
        ),
        mediaQueries: state.mediaQueries,
      }

    case 'setQueries':
      return init(action.queries)
  }
}

/**
 * A hook that returns a [`MediaQueryMatches`](#mediaquerymatches) object which will
 * tell you if specific media queries matched, all media queries matched, or
 * any media queries matched. Matches in this hook will always return `false` when
 * rendering on the server.
 *
 * @param queryMap The media queries you want to match against e.g. `{screen: "screen", width: "(min-width: 12em)"}`
 */
export function useMediaQueries<T>(
  queryMap: MediaQueries<T>
): MediaQueryMatches<T> {
  const prevQueries = React.useRef<MediaQueries<T>>(queryMap)
  const [state, dispatch] = React.useReducer<
    React.Reducer<State<T>, Action<T>>,
    MediaQueries<T>
  >(reducer, queryMap, init)

  React.useEffect(() => {
    if (queriesDidChange(queryMap, prevQueries.current)) {
      dispatch({type: 'setQueries', queries: queryMap})
      prevQueries.current = queryMap
    }
  }, [queryMap])

  React.useEffect(() => {
    const queries: MediaQueryList[] = Object.values(state.mediaQueries)
    const callbacks: (() => void)[] = queries.map((mq) => {
      const callback = () => dispatch({type: 'updateMatches'})
      if (typeof mq.addListener !== 'undefined') mq.addListener(callback)
      else mq.addEventListener('change', callback)

      return callback
    })

    return () => {
      queries.forEach((mq: MediaQueryList, i: number) => {
        if (typeof mq.addListener !== 'undefined')
          mq.removeListener(callbacks[i])
        else mq.removeEventListener('change', callbacks[i])
      })
    }
  }, [state.mediaQueries])

  const {matches} = state
  const matchValues = React.useMemo<boolean[]>(() => Object.values(matches), [
    matches,
  ])

  return {
    matches,
    matchesAny: matchValues.some(Boolean),
    matchesAll: matchValues.length > 0 && matchValues.every(Boolean),
  }
}

/**
 * A hook that returns `true` if the media query matched and `false` if not. This
 * hook will always return `false` when rendering on the server.
 *
 * @param query The media query you want to match against e.g. `"only screen and (min-width: 12em)"`
 */
export function useMediaQuery(query: string) {
  return useMediaQueries(getObj(query)).matchesAll
}

const cache: Record<string, MediaQueries<{default: string}>> = {}

function getObj(query: string): MediaQueries<{default: string}> {
  if (cache[query] === void 0) cache[query] = {default: query}
  return cache[query]
}

export type MediaQueries<T> = {
  [Name in keyof T]: string
}

export type Matches<T> = {
  [Name in keyof T]: boolean
}

interface State<T> {
  mediaQueries: {[Name in keyof T]: MediaQueryList}
  matches: Matches<T>
}

type UpdateMatchesAction = {
  type: 'updateMatches'
}
type SetQueriesAction<T> = {
  type: 'setQueries'
  queries: MediaQueries<T>
}
type Action<T> = UpdateMatchesAction | SetQueriesAction<T>

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
