import {createElement, createContext, useContext} from 'react'

// preloads all of the async components used in the current react tree
const createPromisesCache = (initial = []) => {
  const cache = {
    // Map from Query component instances to pending promises.
    promises: initial,
    push: (...args) => cache.promises.push(...args),
    load() {
      return Promise.all(cache.promises).then(() => (cache.promises = []))
    }
  }

  return cache
}

export const ServerPromisesContext = createContext()
export const Consumer = ServerPromisesContext.Consumer
export const ServerPromisesConsumer = ServerPromisesContext.Consumer
export const useServerPromises = () => useContext(ServerPromisesContext)

// renders the app until there are no promises that get pushed to the cache array
export const loadPromises = (
  children,
  render = require('react-dom/server').renderToStaticMarkup,
  cache = createPromisesCache()
) => {
  const process = () => {
    const html = render(
      createElement(ServerPromisesContext.Provider, {value: cache, children})
    )
    return cache.promises.length > 0 ? cache.load().then(process) : html
  }

  return Promise.resolve().then(process)
}
