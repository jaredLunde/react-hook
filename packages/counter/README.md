# @react-hook/counter
A counter implemented as a React hook

## Installation
`yarn add @react-hook/counter`

## Usage
```js
import useCounter from '@react-hook/counter'

const F = props => {
  const {value, incr, decr, setValue} = useCounter(
    0, 
    {min: 0, max: 10, step: 0.5, cast: parseFloat, onChange: console.log}
  )
  
  return (
    <button onClick={incr}>
      Button clicked: {value} 
    </button>
  )
}
```