<hr>
<div align="center">
  <h1 align="center">
    useWindowScroll()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/window-scroll">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/window-scroll?style=for-the-badge&labelColor=24292e">
  </a>
  <!--<a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/react-hook">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>-->
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/window-scroll">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/window-scroll?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/window-scroll?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">
  npm i @react-hook/window-scroll
</pre>
<hr>

A react hook for updating components when the scroll position of the window on the
y-axis changes

## Quick Start
```jsx harmony
import useWindowScroll from '@react-hook/window-scroll'

const Component = props => {
  const scrollY = useWindowScroll(60 /*fps*/)
  return <div>scroll pos: {scrollY}</div>
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