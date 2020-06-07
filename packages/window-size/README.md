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
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
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

React hooks for updating components when the size or orientation of the `window`
changes. These hooks come in two forms: **debounced**
using [`useDebounce()`](https://github.com/jaredLunde/react-hook/tree/master/packages/debounce)
and **throttled** using [`useThrottle()`](https://github.com/jaredLunde/react-hook/tree/master/packages/throttle).

## Quick Start

[Check out the example on **CodeSandbox**](https://codesandbox.io/s/react-hookwindow-size-and-react-hookwindow-scroll-examples-oqmer?file=/src/App.js)

```jsx harmony
//
// Debounced values
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const Component = (props) => {
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

const Component = (props) => {
  const [width, height] = useWindowSize()
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()
}
```

## API

### useWindowSize(options?): [number, number]

A hook that returns the current width and height of the window. This hook is debounced, meaning it will
wait (100ms by default) for the resize events to stop firing before it actually updates its state with
the new width and height.

#### Options

|         | Type                                                      | Required? | Description                                                                                            |
| ------- | --------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions) below. |

#### DebouncedWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                                   |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| wait          | `number`  | `100`   | The amount of time in `ms` you want to wait after the latest resize event before updating the size of the window in state.    |
| leading       | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to debouncing any additional events. |
| initialWidth  | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                           |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                          |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### useWindowWidth(options?): number

A hook that returns the current width of the window. This hook is debounced, meaning it will
wait (100ms by default) for the resize events to stop firing before it actually updates its state with
the new width.

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-1) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-1) below. |

#### DebouncedWindowSizeOptions

| Key          | Type      | Default | Description                                                                                                                   |
| ------------ | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| wait         | `number`  | `100`   | The amount of time in `ms` you want to wait after the latest resize event before updating the size of the window in state.    |
| leading      | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to debouncing any additional events. |
| initialWidth | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                           |

#### Returns `width: number`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### useWindowHeight(options?): number

A hook that returns the current height of the window. This hook is debounced, meaning it will
wait (100ms by default) for the resize events to stop firing before it actually updates its state with
the new height.

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-2) | No        | Options for configuring the hook. See [DebouncedWindowSizeOptions](#debouncedwindowsizeoptions-2) below. |

#### DebouncedWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                                   |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| wait          | `number`  | `100`   | The amount of time in `ms` you want to wait after the latest resize event before updating the size of the window in state.    |
| leading       | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to debouncing any additional events. |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                          |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

---

## Throttled API

To use these throttled hooks instead of debounced hooks, import with `import {...} from '@react-hook/window-size/throttled`

### useWindowSize(options?): [number, number]

A hook that returns the current width and height of the window. This hook is throttled, meaning it will
only update its state at most 30fps (by default, configuration below) with the new width and height
of the window. It will always update at the trailing edge, so you don't have to worry about not having
the correct width or height after the window is finished resizing. It will also update at the leading edge
if configured to do so.

#### Options

|         | Type                                                      | Required? | Description                                                                                            |
| ------- | --------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions) below. |

#### ThrottledWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                                   |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| fps           | `number`  | `30`    | The rate in frames per second at which the size of the window is updated                                                      |
| leading       | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to throttling any additional events. |
| initialWidth  | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                           |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                          |

#### Returns `[width: number, height: number]`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| width  | `number` | The current `clientWidth` of the window  |
| height | `number` | The current `clientHeight` of the window |

---

### useWindowWidth(options?): number

A hook that returns the current width of the window. This hook is throttled, meaning it will
only update its state at most 30fps (by default, configuration below) with the new width of the window.
It will always update at the trailing edge, so you don't have to worry about not having
the correct width after the window is finished resizing. It will also update at the leading edge
if configured to do so.

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-1) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-1) below. |

#### ThrottledWindowSizeOptions

| Key          | Type      | Default | Description                                                                                                                   |
| ------------ | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| fps          | `number`  | `30`    | The rate in frames per second at which the size of the window is updated                                                      |
| leading      | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to throttling any additional events. |
| initialWidth | `number`  | `0`     | The initial width to use when there is no `window` object, e.g. SSR                                                           |

#### Returns `width: number`

|       | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| width | `number` | The current `clientWidth` of the window |

---

### useWindowHeight(options?): number

A hook that returns the current height of the window. This hook is throttled, meaning it will
only update its state at most 30fps (by default, configuration below) with the new height of the window.
It will always update at the trailing edge, so you don't have to worry about not having
the correct height after the window is finished resizing. It will also update at the leading edge
if configured to do so.

#### Options

|         | Type                                                        | Required? | Description                                                                                              |
| ------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| options | [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-2) | No        | Options for configuring the hook. See [ThrottledWindowSizeOptions](#throttledwindowsizeoptions-2) below. |

#### ThrottledWindowSizeOptions

| Key           | Type      | Default | Description                                                                                                                   |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| fps           | `number`  | `30`    | The rate in frames per second at which the size of the window is updated                                                      |
| leading       | `boolean` | `false` | When `true`, updates the size of the window on the leading edge (right away) in addition to throttling any additional events. |
| initialHeight | `number`  | `0`     | The initial height to use when there is no `window` object, e.g. SSR                                                          |

#### Returns `height: number`

|        | Type     | Description                              |
| ------ | -------- | ---------------------------------------- |
| height | `number` | The current `clientHeight` of the window |

## LICENSE

MIT
