# @react-hook/click
A React hook for conditionally firing a function when an element is
clicked - for instance if you only want a click even to fire on
double-clicks.

## Installation
`yarn add @react-hook/click`

## Usage
```js
import useClick from '@react-hook/click'

const F = props => {
  // this onClick even will only fire if this was a double-click with
  // the left mouse clicker
  const maybeHandleClick = useClick(console.log, 'left', 'double')
  
  return (
    <button onClick={maybeHandleClick}>
      Double-click me
    </button>
  )
}
```

### `useClick(onClick: function, ...conditions: string)`
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
- `...conditions`
  - `<string>`
  - One or several conditions about the click that must be met in order
    for the `onClick` callback to fire
  - *Options*
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
  - *Complex queries*
    - `detail=1`
      - Equality check, i.e. `event.detail === 1`
    - `shiftKey`
      - Boolean check, i.e. `event.shiftKey === true`
    - `shiftKey+metaKey`
      - `AND`, i.e. `event.shiftKey === true && event.metaKey === true`
    - `shiftKey|metaKey+detail=1`
      - `OR`, i.e. `event.shiftKey === true || event.metaKey === true && detail === 1`