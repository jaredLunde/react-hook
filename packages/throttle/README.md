<hr>
<div align="center">
  <h1 align="center">
    useThrottle()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/throttle">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/throttle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/throttle">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/throttle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/throttle">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/throttle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/throttle?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/throttle</pre>
<hr>

A React hook for throttling setState and other callbacks.

## Quick Start

```jsx harmony
import {useThrottle, useThrottleCallback} from '@react-hook/throttle'

const Component = props => {
  // at a basic level, used just like useState
  const [value, setValue] = useThrottle('initialValue')
}

const useMyCallback = (initialState, wait, leading) => {
  // this is the same code useThrottle() uses to throttle setState
  const [state, setState] = useState(initialState)
  return [state, useThrottleCallback(setState, wait, leading)]
}
```

## API

### `useThrottle(initialState: any, fps?: number, leading?: boolean)`

#### Options

| Property     | Type      | Default | Description                                                                                                                |
| ------------ | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| initialState | `any`     |         | The initial state stored in `useState`                                                                                     |
| fps          | `number`  | `30`    | Defines the rate in frames per second with which `setState` is invoked with new state                                      |
| leading      | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false`, `setState` will not be called until the next frame is due |

#### Returns `[state, setState]`

| Variable | Type       | Description                                       |
| -------- | ---------- | ------------------------------------------------- |
| state    | `any`      | The value set by `setState` or the `initialState` |
| setState | `Function` | A throttled `setState` callback                   |

---

### `useThrottleCallback(callback: Function, wait?: number, leading?: boolean)`

#### Options

| Property | Type       | Default | Description                                                                                                                |
| -------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| callback | `Function` |         | This is the callback you want to throttle                                                                                  |
| fps      | `number`   | `30`    | Defines the rate in frames per second with which `setState` is invoked with new state                                      |
| leading  | `boolean`  | `false` | Calls `setState` on the leading edge (right away). When `false`, `setState` will not be called until the next frame is due |

#### Returns `throttledCallback`

| Variable          | Type       | Description                          |
| ----------------- | ---------- | ------------------------------------ |
| throttledCallback | `Function` | A throttled version of your callback |

## LICENSE

MIT
