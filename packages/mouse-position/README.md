<hr>
<div align="center">
  <h1 align="center">
    useMouse()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/mouse-position">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/mouse-position">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/mouse-position?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
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

A React hook for tracking the position, hover, and "down" state of the mouse as it interacts
with an element. This hook provides interoperability between touch and desktop devices and will treat
`ontouch` events the same as `onmouse` ones. Additionally, this hook is throttled to `30fps` by default
using a [useThrottle() hook](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle),
though the precise frame rate is configurable.

## Quick Start

[Check out the example on **CodeSandbox**](https://codesandbox.io/s/react-hookmouse-position-example-udsxi?file=/src/App.js)

```jsx harmony
import * as React from 'react'
import useMouse from '@react-hook/mouse-position'

const Component = (props) => {
  const ref = React.useRef(null)
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  return (
    // You must provide the ref to the element you're tracking the
    // mouse position of
    <div ref={ref}>
      Hover me and see where I am relative to the element:
      <br />
      x: ${mouse.x}
      y: ${mouse.y}
    </div>
  )
}
```

## API

### useMouse(target, options?)

A hook for tracking the mouse position in an element with interoperability between touch
devices and mouse devices.

#### Arguments

| Argument | Type                                                       | Required? | Description                                                            |
| -------- | ---------------------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| target   | <code>React.RefObject&lt;T&gt; &#124; T &#124; null</code> | Yes       | The React ref, `window`, or HTML element to add the event listener to  |
| options  | [`UseMouseOptions`](#usemouseoptions)                      | No        | Configuration options. See [`UseMouseOptions`](#usemouseoptions) below |

#### Returns [`MousePosition`](#mouseposition)

The mouse position data for the target element. See [`MousePosition`](#mouseposition) below.

#### UseMouseOptions

| Property   | Type     | Default | Description                                                                                            |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------ |
| enterDelay | `number` | `0`     | The time in `ms` to wait after an initial action before setting the latest `mousemove` events to state |
| leaveDelay | `number` | `0`     | The time in `ms` to wait after a final action before setting the latest `mouseleave` events to state   |
| fps        | `number` | `30`    | The rate in frames-per-second that the mouse position should update                                    |

#### MousePosition

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
| isDown        | `boolean` | `false` | `true` if the mouse is currently hovering over the element AND is down                            |
| isTouch       | `boolean` | `false` | `true` if the the last event was triggered by a touch event                                       |

## LICENSE

MIT
