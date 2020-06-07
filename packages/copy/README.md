<hr>
<div align="center">
  <h1 align="center">
    useCopy()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/copy">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/copy?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/copy">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/copy?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/copy">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/copy?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/copy?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/copy</pre>
<hr>

A React hook for copying text to the clipboard

## Quick Start

```jsx harmony
import useCopy from '@react-hook/copy'

const Component = (props) => {
  const {copied, copy, reset} = useCopy(
    'This text will be copied to the clipboard'
  )

  return <a onClick={copy}>{copied === false ? 'Copy' : 'Copied'}</a>
}
```

## API

### useCopy(text: string)

| Argument | Type     | Required? | Description                                                       |
| -------- | -------- | --------- | ----------------------------------------------------------------- |
| text     | `string` | Yes       | The text you want to copy to the clipboard when `copy` is clicked |

### Returns `{copied: boolean, copy: () => void, reset: () => void}`

## LICENSE

MIT
