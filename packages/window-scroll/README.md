# @react-hook/window-scroll
A React hook for monitoring the scroll position of the window on the Y axis

## Installation
`yarn add @react-hook/window-scroll`

## Usage
```js
import useWindowScroll from '@react-hook/window-scroll'

const F = props => {
    const scrollY = useWindowScroll(60 /*fps*/)
}
```