# @react-hook/hover
A React hook for tracking the hover state of DOM elements in browsers
where hover is enabled. If the browser does not support hover states
(e.g. a phone) the `isHovering` value will always be `false`.

## Installation
`yarn add @react-hook/hover`

## Usage
```jsx harmony
import useHover from '@react-hook/hover'

const F = props => {
  const [hoverRef, isHovering] = useHover(200/*enterDelay*/, 200/*leaveDelay*/)
  return (
    <div ref={hoverRef}>
      {isHovering ? 'Hovering' : 'Not hovering'}
    </div>
  )
}
```