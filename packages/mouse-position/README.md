<hr>
<div align="center">
  <h1 align="center">
    useMousePosition()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/mouse-position">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/mouse-position">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/mouse-position">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/mouse-position</pre>
<hr>

A React hook for tracking the position of the mouse as it moves around an element. This
hook also provides an interop between touch and desktop devices and will treat
`ontouch` events the same as `onmouse` ones.

## Quick Start

```jsx harmony
import useMousePosition from '@react-hook/mouse-position'

const Component = props => {
  const [mousePosition, ref] = useMousePosition(
    0, // enterDelay
    0, // leaveDelay
    30 // fps
  )

  return (
    <div ref={ref}>
      Hover me and see where I am relative to the element:
      <br />
      x: ${mousePosition.x}
      y: ${mousePosition.y}
    </div>
  )
}
```

## API

### `useMousePosition(enterDelay?: number, leaveDelay?: number, fps?: number)`

#### Arguments

| Argument   | Type     | Default | Description                                                                                           |
| ---------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| enterDelay | `number` | `0`     | The amount of time in `ms` to wait after an initial action before setting `mousemove` events to state |
| leaveDelay | `number` | `0`     | The amount of time in `ms` to wait after a final action before setting `mouseleave` events to state   |
| fps        | `number` | `30`    | The rate in frames-per-second that the state should update                                            |

#### Returns `[state: MousePosition, ref: (element: HTMLElement) => void]`

| Variable | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| `state`  | The mouse position data for the ref'd element                                             |
| `ref`    | The callback ref you must provide to the element you want to track mouse data position of |

#### state: MousePosition

| Key           | Type      | Default | Description                                                                                       |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------- |
| x             | `number`  | `null`  | Mouse position relative to the left edge of the element, `null` if mouse is not over the element  |
| y             | `number`  | `null`  | Mouse position relative to the top edge of the element, `null` if mouse is not over the element   |
| pageX         | `number`  | `null`  | Mouse position relative to the left edge of the document, `null` if mouse is not over the element |
| pageY         | `number`  | `null`  | Mouse position relative to the top edge of the document, `null` if mouse is not over the element  |
| clientX       | `number`  | `null`  | Mouse position relative to the left edge of the client, `null` if mouse is not over the element   |
| clientY       | `number`  | `null`  | Mouse position relative to the top edge of the client, `null` if mouse is not over the element    |
| screenX       | `number`  | `null`  | Mouse position relative to the left edge of the screen, `null` if mouse is not over the element   |
| screenY       | `number`  | `null`  | Mouse position relative to the top edge of the screen, `null` if mouse is not over the element    |
| elementWidth  | `number`  | `null`  | `DOMRect.width` of the element, `null` if mouse is not over the element                           |
| elementHeight | `number`  | `null`  | `DOMRect.height` of the element, `null` if mouse is not over the element                          |
| isOver        | `boolean` | `false` | `true` if the mouse is currently hovering over the element                                        |

## LICENSE

MIT
