[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@react-hook/window-scroll?style=plastic)](https://bundlephobia.com/result?p=@react-hook/window-scroll)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://jaredlunde.mit-license.org/)

---

# @react-hook/window-scroll
A react hook for updating components when the scroll position of the window on the
y-axis changes

## Installation
#### `npm i @react-hook/window-scroll`
#### `yarn add @react-hook/window-scroll`

## Usage
```js
import useWindowScroll from '@react-hook/window-scroll'

const F = props => {
    const scrollY = useWindowScroll(60 /*fps*/)
}
```

### `useWindowScroll(fps?: number)`
- `fps` `<number>`
  - **default** 30
  - Defines the rate in frames per second with which the scroll position
    is updated
  
#### Returns `scrollY: integer`
- `scrollY`
  - The current scroll position of the window on the y-axis