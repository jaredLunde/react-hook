[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@react-hook/switch?style=plastic)](https://bundlephobia.com/result?p=@react-hook/switch)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://jaredlunde.mit-license.org/)

---

# @react-hook/switch

A react hook for controlling a boolean value with toggle, on, and off callbacks

## Installation

#### `npm i @react-hook/switch`

#### `yarn add @react-hook/switch`

## Usage

```jsx harmony
import useSwitch from '@react-hook/switch'

const F = props => {
  const [value, toggle] = useSwitch(false /*default value*/)

  return (
    <>
      {/* toggles the current value to its opposite*/}
      <button onClick={toggle}>Toggle</button>
      {/* toggles the current value to true*/}
      <button onClick={toggle.on}>On</button>
      {/* toggles the current value to false*/}
      <button onClick={toggle.off}>On</button>
    </>
  )
}
```

### `useSwitch(initialValue: boolean): function`

- `initialValue` `<boolean>`
  - **default** `false`
  - Sets the initial value

#### Returns `[value: boolean, toggle: function]: Array`

- `toggle`
  - Toggles the current value to its opposite. If `true`, then `false`.
  - **Methods**
    - `on` `<function>`
      - Sets the value to `true`
    - `off` `<function>`
      - Sets the value to `false`

## LICENSE

MIT
