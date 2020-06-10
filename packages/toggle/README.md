<hr>
<div align="center">
  <h1 align="center">
    useToggle()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/toggle">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/toggle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/toggle">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/toggle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/toggle">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/toggle?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/toggle?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/toggle</pre>
<hr>

A React hook for toggling between two values

## Quick Start

```jsx harmony
import useToggle from '@react-hook/toggle'

const Component = (props) => {
  const [value, toggle] = useToggle(false, true)

  return (
    <button onClick={toggle}>
      {value === false ? 'Toggle on' : 'Toggle off'}
    </button>
  )
}
```

## API

### useToggle(off?, on?, defaultValue?)

```ts
function useToggle<Off extends any, On extends any>(
  off: Off,
  on: On,
  defaultValue: Off | On = off
): [Off | On, () => void]
```

| Argument     | Type       | Default | Required? | Description                                                        |
| ------------ | ---------- | ------- | --------- | ------------------------------------------------------------------ |
| off          | `Off`      | `false` | No        | The value of the toggle in its `off` state                         |
| on           | `On`       | `true`  | No        | The value of the toggle in its `on` state                          |
| defaultValue | `Off \| On` | `off`   | No        | The default value of the toggle, either the value of `off` or `on` |

## LICENSE

MIT
