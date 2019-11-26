<hr>
<div align="center">
  <h1 align="center">
    useDebounce()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/debounce">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/debounce?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/debounce">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/debounce?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/debounce">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/debounce?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/debounce?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/debounce</pre>
<hr>

A React hook for debouncing setState and other callbacks

## Quick Start

```jsx harmony
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'

const Component = props => {
  // at a basic level, used just like useState
  const [value, setValue] = useDebounce('initialValue')
}

const useMyCallback = (initialState, wait, leading) => {
  // this is the same code useDebounce() uses to debounce setState
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}
```

## API

### `useDebounce(initialState: any, wait?: number, leading?: boolean)`

#### Options

| Property     | Type      | Default | Description                                                                                                                |
| ------------ | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| initialState | `any`     |         | The initial state stored in `useState`                                                                                     |
| wait         | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                     |
| leading      | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false`, `setState` will not be called until the next frame is due |

#### Returns `[state, setState]`

| Variable | Type       | Description                                       |
| -------- | ---------- | ------------------------------------------------- |
| state    | `any`      | The value set by `setState` or the `initialState` |
| setState | `Function` | A debounced `setState` callback                   |

---

### `useDebounceCallback(callback: Function, wait?: number, leading?: boolean)`

#### Options

| Property | Type       | Default | Description                                                                                                                |
| -------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| callback | `Function` |         | This is the callback you want to debounce                                                                                  |
| wait     | `number`   | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                     |
| leading  | `boolean`  | `false` | Calls `setState` on the leading edge (right away). When `false`, `setState` will not be called until the next frame is due |

#### Returns `debouncedCallback`

| Variable          | Type       | Description                          |
| ----------------- | ---------- | ------------------------------------ |
| debouncedCallback | `Function` | A debounced version of your callback |

## LICENSE

MIT
