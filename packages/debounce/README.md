# @react-hook/debounce
A hook for debouncing values and callbacks.


## Installation
`yarn add @react-hook/debounce`

## Usage
```js
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'

const F = props => {
    // basic usage
    const [value, setValue] = useDebounce('initialValue', 200/*wait*/, true/*leading*/)
}

export const CallbackExample = (initialState, wait, leading) => {
  // this is actually the same code useDebounce() uses
  const [state, setState] = useState(initialState)
  return [state, useDebounceCallback(setState, wait, leading)]
}
```


### `useDebounce(initialValue: any, fps: number, leading: bool)`
- `initialValue` `<any>`
  - Sets an initial state
- `wait` `<number>`
  - **default** 100
  - Defines the amount of time you want `setState` to wait after the
    last received action before executing
- `leading` `<bool>`
  - **default** false
  - Calls `setState` on the leading edge (right away). When `false`
    `setState` will not be called until the next frame is due

#### Returns `[value: any, setValue: function]: array`
- `value`
  - The value set by `setValue` or the `initialValue`
- `setValue`
  - A debounced `setState` callback
  
----

### `useDebounceCallback(fn: function, fps: number, leading: bool)`
- `fn` `<any>`
  - This is the callback you want to debounce
- `wait` `<number>`
  - **default** 100
  - Defines the amount of time you want `setState` to wait after the
    last received action before executing
- `leading` `<bool>`
  - **default** false
  - Calls `setState` on the leading edge (right away). When `false`
    `setState` will not be called until the next frame is due

#### Returns `setValue: function`
- `debouncedFn`
  - The debounced `fn` callback