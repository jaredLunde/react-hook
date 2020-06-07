import * as React from 'react'
export const ServerPromisesContext = React.createContext(createPromisesCache())
export const useServerPromises = () => React.useContext(ServerPromisesContext)

// renders the app until there are no promises that get pushed to the cache array
export function loadPromises<T>(
  tree: React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  render: (element: React.ReactElement) => T = require('react-dom/server')
    .renderToStaticMarkup
): Promise<T> {
  const cache = createPromisesCache()

  const process = (): Promise<T> | T => {
    const html = render(
      React.createElement(ServerPromisesContext.Provider, {
        value: cache,
        children: tree,
      })
    )

    return cache.promises.length > 0 ? cache.load().then(process) : html
  }

  return Promise.resolve().then(process)
}

// preloads all of the async components used in the current react tree
function createPromisesCache(initial: Promise<any>[] = []) {
  const cache = {
    // Map from Query component instances to pending promises.
    promises: initial,
    push: (...args: Promise<any>[]) => cache.promises.push(...args),
    load(): Promise<any> {
      return Promise.all(cache.promises).then(() => (cache.promises = []))
    },
  }

  return cache
}

export interface ServerPromisesContextType {
  /**
   * An array of promises that are still pending
   */
  promises: Promise<any>[]
  /**
   * Adds a promise to the promises array
   */
  push: (...args: Promise<any>[]) => number
  /**
   * Loads all of the promises currently in the promises array
   */
  load: () => Promise<any>
}
