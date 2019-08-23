[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@react-hook/window-size?style=plastic)](https://bundlephobia.com/result?p=@react-hook/window-size)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://jaredlunde.mit-license.org/)

---

# @react-hook/window-size
React hooks for updating components when the size of the `window`
changes.

## Installation
#### `npm i @react-hook/window-size`
#### `yarn add @react-hook/window-size`

## Usage
```jsx
// using debounced values
import {
  useWindowSize, 
  useWindowWidth, 
  useWindowHeight
} from '@react-hook/window-size'

const F = props => {
  const [width, height] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    {wait: 100}
  )
}

// using throttled values
import {
  useWindowSize, 
  useWindowWidth, 
  useWindowHeight
} from '@react-hook/window-size/throttled'

const F = props => {
  const [width, height] = useWindowSize(
    360 /* initialWidth when there is no window */,
    720 /* initialHeight when there is no window */,
    {fps: 30}
  )
}
```

## Debounced
### `useWindowSize(initialWidth?: number, initialHeight?: number, debounceOptions?: object)`
- `initialWidth` `<number>`
  - The initial width to use when there is no `window` object
- `initialHeight` `<number>`
  - The initial width to use when there is no `window` object
- `debounceOptions` `<object>`
  - `wait` `<number>`
    - **default** 100
    - Defines the amount of time you want `setState` to wait after the
      last received action before executing
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
  
#### Returns `[width: integer, height: integer]: array`
- `width`
  - The current width of the window
- `height`
  - The current height of the window

### `useWindowWidth(initialWidth?: number, debounceOptions?: object)`
- `initialWidth` `<number>`
  - The initial width to use when there is no `window` object
- `debounceOptions` `<object>`
  - `wait` `<number>`
    - **default** 100
    - Defines the amount of time you want `setState` to wait after the
      last received action before executing
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
  
#### Returns `width: integer`
- `width`
  - The current width of the window


### `useWindowHeight(initialHeight?: number, debounceOptions?: object)`
- `initialHeight` `<number>`
  - The initial height to use when there is no `window` object
- `debounceOptions` `<object>`
  - `wait` `<number>`
    - **default** 100
    - Defines the amount of time you want `setState` to wait after the
      last received action before executing
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
  
#### Returns `height: integer`
- `height`
  - The current height of the window

----
## Throttled
```js 
import { 
  useWindowSize, 
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/toggle/throttled'
```
### `useWindowSize(initialWidth?: number, initialHeight?: number, throttleOptions?: object)`
- `initialWidth` `<number>`
  - The initial width to use when there is no `window` object
- `initialHeight` `<number>`
  - The initial width to use when there is no `window` object
- `throttleOptions` `<object>`
  - `fps` `<number>`
    - **default** 30
    - Defines the rate in frames per second with which the scroll position
      is updated
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
  
#### Returns `[width: integer, height: integer]: array`
- `width`
  - The current width of the window
- `height`
  - The current height of the window

### `useWindowWidth(initialWidth?: number, throttleOptions?: object)`
- `initialWidth` `<number>`
  - The initial width to use when there is no `window` object
- `throttleOptions` `<object>`
  - `fps` `<number>`
    - **default** 30
    - Defines the rate in frames per second with which the scroll position
      is updated
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
  
#### Returns `width: integer`
- `width`
  - The current width of the window


### `useWindowHeight(initialHeight?: number, throttleOptions?: object)`
- `initialHeight` `<number>`
  - The initial height to use when there is no `window` object
- `throttleOptions` `<object>`
  - `fps` `<number>`
    - **default** 30
    - Defines the rate in frames per second with which the scroll position
      is updated
  - `leading` `<bool>`
    - **default** false
    - Calls `setState` on the leading edge (right away). When `false`
      `setState` will not be called until the next frame is due
      
#### Returns `height: integer`
- `height`
  - The current height of the window