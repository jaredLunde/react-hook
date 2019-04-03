# @react-hook/toggle
A React hook for toggling between two values

## Installation
`yarn add @react-hook/toggle`

## Usage
```jsx harmony
import useToggle from '@react-hook/toggle'

const F = props => {
  const [value, toggle] = useToggle(false, true)
  return (
    <button onClick={toggle}>
      {value === false ? 'Toggle on' : 'Toggle off'}
    </button>
  )
}
```

### useToggle(off: any, on: any, defaultValue: on|off)
- `off`
  - **default** `false`
  - Any value
- `on`
  - **default** `true`
  - Any value
- `defaultValue`
  - **default** the value of `off` 
