<hr>
<div align="center">
  <h1 align="center">
    useWindowSize()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/window-size">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
  <!--<a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>-->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/window-size">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">
  npm i @react-hook/window-size
</pre>
<hr>

React hooks for updating components when the size of the `window`
changes.

## Quick Start
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

## API

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