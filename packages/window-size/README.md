<hr>
<div align="center">
  <h1 align="center">
    useWindowSize()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/window-size">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/window-size">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/window-size">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/window-size?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/window-size</pre>
<hr>

React hooks for updating components when the size of the `window`
changes.

## Quick Start

```jsx harmony
//
// Debounced values
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const Component = props => {
  const [width, height] = useWindowSize()
}

//
// Throttled values
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled'

const Component = props => {
  const [width, height] = useWindowSize()
}
```

## API

### `useWindowSize(initialWidth?: number, initialHeight?: number, debounceOptions?: DebounceOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialWidth    | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| initialHeight   | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| debounceOptions | `DebounceOptions` |         | Options object passed to the [`useDebounce`](https://github.com/jaredLunde/react-hook/tree/master/packages/debounce) hook |

#### DebounceOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait    | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### `useWindowWidth(initialWidth?: number, debounceOptions?: DebounceOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialWidth    | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| debounceOptions | `DebounceOptions` |         | Options object passed to the [`useDebounce`](https://github.com/jaredLunde/react-hook/tree/master/packages/debounce) hook |

#### DebounceOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait    | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `width`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### `useWindowHeight(initialHeight?: number, debounceOptions?: DebounceOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialHeight   | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| debounceOptions | `DebounceOptions` |         | Options object passed to the [`useDebounce`](https://github.com/jaredLunde/react-hook/tree/master/packages/debounce) hook |

#### DebounceOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait    | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

---

## Throttled API

To use these throttled hooks instead of debounced hooks, import with `import {...} from '@react-hook/window-size/throttled`

### `useWindowSize(initialWidth?: number, initialHeight?: number, throttleOptions?: ThrottleOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialWidth    | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| initialHeight   | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| throttleOptions | `ThrottleOptions` |         | Options object passed to the [`useThrottle`](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle) hook |

#### ThrottleOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps     | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### `useWindowWidth(initialWidth?: number, throttleOptions?: ThrottleOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialWidth    | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| throttleOptions | `ThrottleOptions` |         | Options object passed to the [`useThrottle`](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle) hook |

#### ThrottleOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps     | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `width`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### `useWindowHeight(initialHeight?: number, throttleOptions?: ThrottleOptions)`

#### Options

|                 | Type              | Default | Description                                                                                                               |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| initialHeight   | `number`          |         | The initial width to use when there is no `window` object                                                                 |
| throttleOptions | `ThrottleOptions` |         | Options object passed to the [`useThrottle`](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle) hook |

#### ThrottleOptions

| Key     | Type      | Default | Description                                                                                                               |
| ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps     | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

## LICENSE

MIT
