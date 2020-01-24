import {useRef, useMemo, useEffect, useReducer, Reducer} from 'react'

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
  // Returns an array of media query matches
  matches: Matches<T>
  // Any of the media queries matched
  matchesAny: boolean
  // All of the media queries matched
  matchesAll: boolean
}

const queriesDidChange = (
  prevQueries: MediaQueries<any>,
  nextQueries: MediaQueries<any>
): boolean => {
  if (nextQueries === prevQueries) return false
  const nextQueriesArr = Object.values(nextQueries)
  const prevQueriesArr = Object.values(prevQueries)
  if (nextQueriesArr.length !== prevQueriesArr.length) return true
  if (nextQueriesArr.some((q, i) => q !== prevQueriesArr[i])) return true
  const prevKeys = Object.keys(prevQueries)
  return Object.keys(nextQueries).some((n, i) => n !== prevKeys[i])
}

const init = <T>(queries: MediaQueries<T>): State<T> => {
  const queryKeys = Object.keys(queries)
  /* istanbul ignore next */
  if (typeof window === 'undefined')
    return queryKeys.reduce(
      (curr: State<any>, key: string) => {
        curr.matches[key] = false
        curr.mediaQueries[key] = {} as MediaQueryList
        return curr
      },
      {mediaQueries: {}, matches: {}}
    )
  return queryKeys.reduce(
    (state: State<any>, name: string): State<T> => {
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
            prev[key] = state.mediaQueries[key].matches
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

export const useMediaQueries = <T>(
  queries: MediaQueries<T>
): MediaQueryMatches<T> => {
  const prevQueries = useRef<MediaQueries<T>>(queries)
  const [state, dispatch] = useReducer<
    Reducer<State<T>, Action<T>>,
    MediaQueries<T>
  >(reducer, queries, init)

  useEffect(() => {
    if (queriesDidChange(queries, prevQueries.current)) {
      dispatch({type: 'setQueries', queries})
      prevQueries.current = queries
    }
  }, [queries])

  useEffect(() => {
    const queries: MediaQueryList[] = Object.values(state.mediaQueries)
    const callbacks: (() => void)[] = queries.map(mq => {
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
  const matchValues = useMemo<boolean[]>(() => Object.values(matches), [
    matches,
  ])

  return {
    matches,
    matchesAny: matchValues.some(Boolean),
    matchesAll: matchValues.length > 0 && matchValues.every(Boolean),
  }
}

const cache = {}
const getObj = (query: string): MediaQueries<{default: string}> => {
  if (cache[query] === void 0) cache[query] = {default: query}
  return cache[query]
}

export const useMediaQuery = (query: string) =>
  useMediaQueries(getObj(query)).matchesAll
