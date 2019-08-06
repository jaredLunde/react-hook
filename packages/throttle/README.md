# @react-hook/throttle
A hook for throttling values and callbacks.


## Installation
`yarn add @react-hook/throttle`

## Usage
```js
import {useThrottle, useThrottleCallback} from '@react-hook/throttle'
// throttling a value
const F = props => {
    // basic usage
    const [value, setValue] = useThrottle(
      'initialValue', 
      30/*fps*/, 
      true/*leading*/
    )
}
// throttling a callback
const CallbackExample = (initialState, fps = 30, leading = false) => {
  // this is the exact code that useThrottle() uses
  const [state, setState] = useState(initialState)
  return [
    state, 
    useThrottleCallback(setState, fps, leading)
  ]
}
```

### `useThrottle(initialValue: any, fps: number, leading: bool)`
- `initialValue` `<any>`
  - Sets an initial state
- `fps` `<number>`
  - **default** 30
  - Defines the rate in frames per second with which `setState` is called
- `leading` `<bool>`
  - **default** false
  - Calls `setState` on the leading edge (right away). When `false`
    `setState` will not be called until the next frame is due

#### Returns `[value: any, setValue: function]: array`
- `value`
  - The value set by `setValue` or the `initialValue`
- `setValue`
  - A throttled `setState` callback
  
----

### `useThrottleCallback(fn: function, fps: number, leading: bool)`
- `fn` `<any>`
  - This is the callback you want to throttle
- `fps` `<number>`
  - **default** 30
  - Defines the rate in frames per second with which `setState` is called
- `leading` `<bool>`
  - **default** false
  - Calls `setState` on the leading edge (right away). When `false`
    `setState` will not be called until the next frame is due

#### Returns `setValue: function`
- `throttledFn`
  - The throttled `fn` callback