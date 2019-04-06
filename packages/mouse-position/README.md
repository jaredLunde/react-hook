# @react-hook/mouse-position
A React hook container for tracking the position of the mouse as it
moves around an element.

## Installation
`yarn add @react-hook/mouse-position`

## Usage
```js
import useMousePosition from '@react-hook/mouse-position'

 const F = props => {
   const [mousePositionRef, mousePosition] = useMousePosition(
     0,   // enterDelay
     0, // leaveDelay
     30,  // fps
   )

   return (
     <div ref={mousePositionRef}>
       Hover me and see where I am relative to the element:<br/>
       x: ${mousePosition.x}
       y: ${mousePosition.y}
     </div>
   )
 }
```

### `useMousePosition(enterDelay: number, leaveDelay: number, fps: number)`
#### Arguments
- `enterDelay`
  - `<number>`
  - **default** `0`
  - the amount of time to wait before tracking `mousemove` events
- `leaveDelay`
  - `<number>`
  - **default** `0`
  - The amount of time to wait before ceasing the monitoring of
    `mousemove` events
- `fps`
  - `<number>`
  - **default** `30`
  - The rate in frames-per-second that the state should update

#### Return values
`<Array>`
- `domRef`
  - `<React.useRef>`
  - You provide this to the dom element you want to monitor via its
    `ref` property
- `positionState`
  - `<object>`
  - `x`
    - `<int>`
    - Mouse position relative to the left edge of the element,
      `null` if mouse is not over the element
  - `y`
    - `<int>`
    - Mouse position relative to the top edge of the element,
      `null` if mouse is not over the element
  - `pageX`
    - `<int>`
    - Mouse position relative to the left edge of the document, `null`
      if mouse is not over the element
  - `pageY {integer}`
    - `<int>`
    - Mouse position relative to the top edge of the document, `null` if
      mouse is not over the element
  - `clientX`
    - `<int>`
    - Mouse position relative to the left edge of the client, `null` if mouse
      is not over the element
  - `clientY`
    - `<int>`
    - Mouse position relative to the top edge of the client, `null` if mouse
      is not over the element
  - `screenX`
    - `<int>`
    - Mouse position relative to the left edge of the screen, `null` if mouse
      is not over the element
  - `screenY`
    - `<int>`
    - Mouse position relative to the top edge of the screen, `null` if
      mouse is not over the element
  - `elementWidth`
    - `<int>`
    - `DOMRect.width` of the element, `null` if mouse is not over
      the element
  - `elementHeight`
    - `<int>`
    - `DOMRect.height` of the element, `null` if mouse is not over
      the element
  - `isOver {bool}`
    - `<bool>`
    - `true` if the mouse is currently hovering over the element
