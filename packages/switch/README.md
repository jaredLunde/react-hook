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
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/switch">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/switch?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/switch</pre>
<hr>

A React hook for controlling a boolean value with toggle, on, and off callbacks

## Quick Start

```jsx harmony
import useSwitch from '@react-hook/switch'

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
```

## API

### `useSwitch(defaultValue?)`

#### Arguments

| Argument     | Type      | Default | Required? | Description               |
| ------------ | --------- | ------- | --------- | ------------------------- |
| defaultValue | `boolean` | `false` | `false`   | Defines the initial value |

#### Returns `[value: boolean, toggle: ToggleFn]`

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
