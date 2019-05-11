# @react-hook/server-promises
A React hook for continuously rendering a React tree until no promises
are pushed to `server-promises`'s context in a given render.

## Installation
`yarn add @react-hook/server-promises`

## Usage
```jsx harmony
import React from 'react'
import {renderToString} from 'react-dom/server'
import {
  useServerPromises, 
  loadPromises,
  // unused here but they exist
  ServerPromisesConsumer,  // render props version of userServerPromises
  ServerPromisesContext,   // the plain context used by server-promises
} from '@react-hook/server-promises'

let LOADED = false
const App = props => {
  const serverPromises = useServerPromises()
  // adds a promise to the server promises cache
  const response = useMemo(
    () => {
      if (LOADED === false) {
        LOADED = true
        return serverPromises.push(fetch('https://github.com'))
      }
    }, 
    []
  )
  
  return <span>Status: {response.status}</span>
}

const ServerRenderer = async props => `
  <html>
    <body>
      <div id='⚛️'>
        ${await loadPromises(<App/>, renderToString)}
      </div>
    </body>
  </html>
`
```