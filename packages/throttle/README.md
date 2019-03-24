# @react-hook/throttle
A hook for throttling values and callbacks.


## Installation
`yarn add @react-hook/throttle`

## Usage
```js
import {useThrottle, useThrottleCallback} from '@react-hook/throttle'

const F = props => {
    // basic usage
    const [value, setValue] = useThrottle('initialValue', 30/*fps*/, true/*leading*/)
    
    // this is actually the same code for useThrottle()
    const [state, setState] = useState(initialState)
    const [state, throttledState] = useThrottleCallback(setState, 30/*fps*/, true/*leading*/)
}
```