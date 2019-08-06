# @react-hook/window-scroll
A React hook for watching the scroll position of the window on the
y-axis

## Installation
`yarn add @react-hook/window-scroll`

## Usage
```js
import useWindowScroll from '@react-hook/window-scroll'

const F = props => {
    const scrollY = useWindowScroll(60 /*fps*/)
}
```

### `useWindowScroll(fps: number)`
- `fps` `<number>`
  - **default** 30
  - Defines the rate in frames per second with which the scroll position
    is updated
  
#### Returns `scrollY: integer`
- `scrollY`
  - The current scroll position of the window on the y-axis