# @react-hook/debounce
A hook for debouncing values and callbacks.


## Installation
`yarn add @react-hook/debounce`

## Usage
```js
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'

const F = props => {
    // basic usage
    const [value, setValue] = useDebounce('initialValue', 200/*wait*/, true/*leading*/)

    // this is actually the same code for useDebounce()
    const [state, setState] = useState(initialState)
    const [state, debouncedState] = useDebounceCallback(setState, 200/*wait*/, true/*leading*/)
}
```