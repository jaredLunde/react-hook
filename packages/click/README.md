<hr>
<div align="center">
  <h1 align="center">
    useClick()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/click">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/click?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/click">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/click?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/click">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/click?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/click?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/click</pre>
<hr>

A React hook for conditionally firing a function when an element is
clicked - for instance if you only want a click even to fire on
double-clicks.

## Quick Start

```jsx harmony
import useClick from '@react-hook/click'

const Component = (props) => {
  // this onClick even will only fire if this was a double-click
  const maybeHandleClick = useClick('double', console.log)
  return <button onClick={maybeHandleClick}>Double-click me</button>
}
```

## API

### `useClick(conditions, onClick)`

- `conditions`
  - `string | string[]`
  - One or several conditions about the click that must be met in order
    for the `onClick` callback to fire
  - _Options_
    - `single`
      - Checks for `e.detail === 1`
    - `double`
      - Checks for `e.detail === 2`
    - `triple`
      - Checks for `e.detail === 3`
    - `left`
      - Checks for `e.button === 0`
    - `middle`
      - Checks for `e.button === 1`
    - `right`
      - Checks for `e.button === 2`
    - `shift`
      - Checks for `e.shiftKey === true`
    - `control`
      - Checks for `e.ctrlKey === true`
    - `meta`
      - Checks for `e.metaKey === true`
    - `alt`
      - Checks for `e.altKey === true`
  - _Complex queries_
    - `detail=1`
      - Equality check, i.e. `event.detail === 1`
    - `shiftKey`
      - Boolean check, i.e. `event.shiftKey === true`
    - `shiftKey+metaKey`
      - `AND`, i.e. `event.shiftKey === true && event.metaKey === true`
    - `shiftKey|metaKey+detail=1`
      - `OR`, i.e. `event.shiftKey === true || event.metaKey === true && detail === 1`
- `onClick`
  - `<function>`
  - A callback that fires when all of the `conditions` are met. The
    callback signature is: `onClick(event, data: {x, y, count})`
    - `event`
      - The React synthetic event
    - `data`
      - `<object>`
      - `x`
        - `<int>`
        - The number of pixels from the left edge of the event target
          where the click occurred
      - `y`
        - `<int>`
        - The number of pixels from the top edge of the event target
          where the click occurred
      - `count`
        - `<int>`
        - The number of times the event target was clicked in succession

#### Returns an `onClick` handler

`(e: React.MouseEvent<HTMLElement>) => void`

## LICENSE

MIT
