<hr>
<div align="center">
  <h1 align="center">
    useSwitch()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/switch">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/switch">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/switch">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/switch</pre>
<hr>

A React hook for controlling a boolean value with toggle, on, and off callbacks. This
is extremely useful for adding controlled/uncontrolled component behavior to components
like `<Checkbox/>`, `<Toggle/>`, `<Modal/>`, etc.

## Quick Start

```jsx harmony
import useSwitch from '@react-hook/switch'

// Basic usage
const Component = (props) => {
  const [value, toggle] = useSwitch(false /*default value*/)

  return (
    <>
      <span>Value: {value}</span>
      {/* toggles the current value to its opposite*/}
      <button onClick={toggle}>Toggle</button>
      {/* toggles the current value to true*/}
      <button onClick={toggle.on}>On</button>
      {/* toggles the current value to false*/}
      <button onClick={toggle.off}>On</button>
    </>
  )
}

// Creating a toggle component with a controlled and uncontrolled
// value pattern
const Toggle = ({value: controlledValue, defaultValue, onChange}) => {
  const [value, toggle] = useSwitch(defaultValue, controlledValue, onChange)

  return (
    <>
      <span>Value: {value}</span>
      <button onClick={toggle}>Toggle</button>
      <button onClick={toggle.on}>On</button>
      <button onClick={toggle.off}>On</button>
    </>
  )
}
```

## API

### `useSwitch(defaultValue?, controlledValue?, onChange?)`

```
function useSwitch(defaultValue?: boolean, controlledValue?: boolean, onChange?: (value: boolean, prevValue: boolean) => any): readonly [boolean, (() => void) & {
    on: () => void;
    off: () => void;
}]
```

#### Arguments

| Argument        | Type                      | Default     | Required? | Description                                                                     |
| --------------- | ------------------------- | ----------- | --------- | ------------------------------------------------------------------------------- |
| defaultValue    | `boolean`                 | `false`     | No        | Sets the default value of the switch                                            |
| controlledValue | `boolean`                 | `undefined` | No        | Sets the controlled value of the switch, which will override the `defaultValue` |
| onChange        | `(value: boolean) => any` | `undefined` | No        | A callback invoked whenever toggle callbacks that change state are invoked      |

#### Returns `[value: boolean, toggle: Toggle]`

| Variable | Type                                             | Description                                                                |
| -------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| value    | `boolean`                                        | Defines the initial value                                                  |
| toggle   | `() => void & {on: () => void, off: () => void}` | If the `value` is `true`, calling this will make it `false` and vice-versa |

#### `() => void & {on: () => void, off: () => void}`

| Method | Type         | Description                     |
| ------ | ------------ | ------------------------------- |
| on     | `() => void` | Switches the `value` to `true`  |
| off    | `() => void` | Switches the `value` to `false` |

## LICENSE

MIT
