import * as React from 'react'
export declare const ServerPromisesContext: React.Context<{
  promises: Promise<any>[]
  push: (...args: Promise<any>[]) => number
  load(): Promise<any>
}>
export declare const useServerPromises: () => {
  promises: Promise<any>[]
  push: (...args: Promise<any>[]) => number
  load(): Promise<any>
}
export declare function loadPromises<T>(
  tree: React.ReactElement,
  render?: (element: React.ReactElement) => T
): Promise<T>
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
