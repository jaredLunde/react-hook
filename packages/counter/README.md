<hr>
<div align="center">
  <h1 align="center">
    useCounter()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/counter">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/counter?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/counter">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/counter?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/counter">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/counter?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/counter?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/counter</pre>
<hr>

A React hook counter with min/max/step/cast options

## Quick Start

```jsx harmony
import useCounter from '@react-hook/counter'

const Component = () => {
  const counter = useCounter(5 /*initialValue*/, {
    min: 0,
    max: 10,
    // Sets the value to the maximum value when
    // the min value threshold has been crossed
    onMin: (set) => set(10),
    // Sets the value to the minimum value when
    // the max value threshold has been crossed
    onMax: (set) => set(0),
  })

  return (
    <div>
      <div>Value: {counter.value}</div>
      <div>
        <button onClick={() => counter.decr()}>-</button>
        {' / '}
        <button onClick={() => counter.incr()}>+</button>
      </div>
    </div>
  )
}
```

## API

### useCounter(initialValue, options)

| Argument     | Type                                      | Default                                       | Required? | Description                      |
| ------------ | ----------------------------------------- | --------------------------------------------- | --------- | -------------------------------- |
| initialValue | `number`                                  | `0`                                           | Yes       | The initial value of the counter |
| options      | [`UseCounterOptions`](#usecounteroptions) | See [`UseCounterOptions`](#usecounteroptions) | No        | Options for the counter          |

### Returns [`UseCounterState`](#usecounterstate)

### UseCounterOptions

| Option | Type                                     | Default     | Description                                                                                                                                        |
| ------ | ---------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| min    | `number`                                 | `undefined` | The minimum counter value                                                                                                                          |
| max    | `number`                                 | `undefined` | The maximum counter value                                                                                                                          |
| step   | `number`                                 | `1`         | The amount to increment/decrement the counter by, by default when `incr` or `decr` are called                                                      |
| cast   | `(value: number) => number`              | `Number`    | Casts the number to a specific type, e.g. `parseFloat`, `parseInt`, etc.                                                                           |
| onMin  | `(set: (value: number) => void) => void` | `undefined` | Called when a user tries to set a value below the `min` value defined above. By default the value will just not change once the `min` is exceeded. |
| onMax  | `(set: (value: number) => void) => void` | `undefined` | Called when a user tries to set a value above the `max` value defined above. By default the value will just not change once the `max` is exceeded. |

### UseCounterState

| Option | Type                          | Description                                              |
| ------ | ----------------------------- | -------------------------------------------------------- |
| value  | `number`                      | The current value of the counter                         |
| set    | `(value: number) => void`     | Sets a new value to the counter                          |
| incr   | `(by: number = step) => void` | Increments the value of the counter by `step` by default |
| decr   | `(by: number = step) => void` | Decrements the value of the counter by `step` by default |

## LICENSE

MIT
