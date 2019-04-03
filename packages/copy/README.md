# @react-hook/copy
A React hook for copying text to the clipboard

## Installation
`yarn add @react-hook/copy`

## Usage
```jsx harmony
import useCopy from '@react-hook/copy'

const F = props => {
  const [copied, copy] = useCopy('This text will be copied to the clipboard')
  return (
    <a onClick={copy}>
      {copied === false ? 'Copy' : 'Copied'}
    </a>
  )
}
```