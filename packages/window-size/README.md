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
changes. These hooks come in two forms: **debounced**
(using [`useDebounce()`](https://github.com/jaredLunde/react-hook/tree/master/packages/debounce))
and **throttled** (using [`useThrottle()`](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle)).

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
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()
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
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()
}
```

## API

### useWindowSize(options?): [number, number]

Returns the current width and height of the window

#### Options

|         | Type                                                      | Required? | Description                                                                                            |
| ------- | --------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions) below. |

#### DebouncedWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait          | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading       | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialWidth  | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                       |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                      |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### useWindowWidth(options?): number

Returns the current width of the window

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-1) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-1) below. |

#### DebouncedWindowSizeOptions

| Key          | Type      | Default | Description                                                                                                               |
| ------------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait         | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading      | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialWidth | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                       |

#### Returns `width: number`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### useWindowHeight(options?): number

Returns the current height of the window

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-2) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-2) below. |

#### DebouncedWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| wait          | `number`  | `100`   | Defines the amount of time you want `setState` to wait after the last received action before executing                    |
| leading       | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                      |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

---

## Throttled API

To use these throttled hooks instead of debounced hooks, import with `import {...} from '@react-hook/window-size/throttled`

### useWindowSize(options?): [number, number]

Returns the current width and height of the window

#### Options

|         | Type                                                      | Required? | Description                                                                                            |
| ------- | --------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions) below. |

#### ThrottledWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps           | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading       | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialWidth  | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                       |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                      |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### useWindowWidth(options?): number

Returns the current width of the window

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-1) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-1) below. |

#### ThrottledWindowSizeOptions

| Key          | Type      | Default | Description                                                                                                               |
| ------------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps          | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading      | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialWidth | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                       |

#### Returns `width: number`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### useWindowHeight(options?): number

Returns the current height of the window

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-2) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-2) below. |

#### ThrottledWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| fps           | `number`  | `30`    | Defines the rate in frames per second with which the scroll position is updated                                           |
| leading       | `boolean` | `false` | Calls `setState` on the leading edge (right away). When `false` `setState` will not be called until the next frame is due |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                      |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

## LICENSE

MIT
