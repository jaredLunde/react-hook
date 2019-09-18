[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@react-hook/merged-ref?style=plastic)](https://bundlephobia.com/result?p=@react-hook/merged-ref)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://jaredlunde.mit-license.org/)

---

# @react-hook/merged-ref

A React hook for merging multiple refs into one ref

## Installation

#### `npm i merged-ref`

#### `yarn add merged-ref`

## Usage

```jsx harmony
import React from 'react'
import useMergedRef from '@react-hook/merged-ref'

const F = React.forwardRef((props, ref) => {
  const otherRef = React.useRef(null)
  const multiRef = useMergedRef(ref, otherRef)
  return <div ref={multiRef} />
})
```

## LICENSE

MIT
