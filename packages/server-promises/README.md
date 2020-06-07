<hr>
<div align="center">
  <h1 align="center">
    useServerPromises()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/server-promises">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/server-promises?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/server-promises">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/server-promises?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/server-promises">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/server-promises?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/server-promises?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/server-promises</pre>
<hr>

A React hook for continuously rendering a React tree until no promises
are pushed to `server-promises`'s context in a given render.

## Quick Start

```jsx harmony
import React from 'react'
import {renderToString} from 'react-dom/server'
import {useServerPromises, loadPromises} from '@react-hook/server-promises'

let LOADED = false
const App = (props) => {
  const serverPromises = useServerPromises()
  // adds a promise to the server promises cache
  const response = useMemo(() => {
    if (LOADED === false) {
      LOADED = true
      return serverPromises.push(fetch('https://github.com'))
    }
  }, [])

  return <span>Status: {response.status}</span>
}

const ServerRenderer = async (props) => `
  <html>
    <body>
      <div id='⚛️'>
        ${await loadPromises(<App />, renderToString)}
      </div>
    </body>
  </html>
`
```

## API

### useServerPromises()

A hook for adding promises to an array of promises you need rendered on the server

#### Returns [`ServerPromisesContextType`](#serverpromisescontexttype)

### ServerPromisesContextType

```ts
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
```

### loadPromises(tree, render?, cache?)

Continuously re-renders the React `tree` until there are no promises pending
in a given render

| Argument | Type                                 | Default                               | Required? | Description                                            |
| -------- | ------------------------------------ | ------------------------------------- | --------- | ------------------------------------------------------ |
| tree     | `React.ReactElement`                 | `undefined`                           | Yes       | A React tree to render to string                       |
| render   | `(element: React.ReactElement) => T` | `ReactDOMServer.renderToStaticMarkup` | No        | A server renderer to continuously render the tree with |

#### Returns `string`

## LICENSE

MIT
