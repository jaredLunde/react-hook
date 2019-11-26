<hr>
<div align="center">
  <h1 align="center">
    useHover()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/hover">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/hover">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/hover">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/hover?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/hover</pre>
<hr>

A React hook for tracking the hover state of DOM elements in browsers
where hover is enabled. If the browser does not support hover states
(e.g. a phone) the `isHovering` value will always be `false`.

## Quick Start

```jsx harmony
import useHover from '@react-hook/hover'

const Component = props => {
  const [isHovering, ref] = useHover(200 /*enterDelay*/, 200 /*leaveDelay*/)
  return <div ref={ref}>{isHovering ? 'Hovering' : 'Not hovering'}</div>
}
```

## API

### `useHover(enterDelay?: number, leaveDelay?: number)`

#### Arguments

| Argument   | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| enterDelay | number | Delays setting `isHovering` to `true` for this amount in `ms`  |
| leaveDelay | number | Delays setting `isHovering` to `false` for htis amount in `ms` |

#### Returns `[isHovering: boolean, ref: (element: HTMLElement) => void]`

| Variable   | Type                             | Description                                                                                                                                               |
| ---------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isHovering | `boolean`                        | `true` if the element in `ref` is in a hover state, otherwise `false`. This value is always `false` on devices that don't have hover states, i.e. phones. |
| ref        | `(element: HTMLElement) => void` | Provide this `ref` to the React element whose hover state you want to observe                                                                             |

## LICENSE

MIT
