[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@react-hook/passive-layout-effect?style=plastic)](https://bundlephobia.com/result?p=@react-hook/passive-layout-effect)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://jaredlunde.mit-license.org/)

---

# @react-hook/passive-layout-effect

A React hook that uses `useEffect()` on the server and `useLayoutEffect()` in the browser

## Installation

#### `npm i @react-hook/passive-layout-effect`

#### `yarn add @react-hook/passive-layout-effect`

## Usage

```jsx harmony
import usePassiveLayoutEffect from '@react-hook/passive-layout-effect'

const F = ({foo, bar}) => {
  // Used the same way useEffect() and useLayoutEffect() are
  usePassiveLayoutEffect(() => {}, [foo, bar])
}
```

## Full credit to

[Dan Abramov](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)

## LICENSE

MIT
