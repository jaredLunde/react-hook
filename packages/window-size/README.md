# @react-hook/window-size
React hooks for monitoring changes to the size of the window.

## Installation
`yarn add @react-hook/window-size`

## Usage
```js
// using debounced values
import {useWindowSize, useWindowWidth, useWindowHeight} from '@react-hook/window-size'

const F = props => {
  const [width, height] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    {wait: 100}
  )
}

// using throttled values
import {useWindowSize, useWindowWidth, useWindowHeight} from '@react-hook/window-size/throttled'

const F = props => {
  const [width, height] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    {fps: 30}
  )
}
```