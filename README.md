<div align="center">
  <h1 align="center">
    ↩ react-hook
    <br>
    <br>
  </h1>
</div>

#### useAsync() [`@react-hook/async`](packages/async)

A React hook for gracefully resolving, cancelling, and handling errors for async functions
and promises.

#### useCache() [`@react-hook/cache`](packages/cache)

A React hook for accessing an asynchronous key/value cache that persists data between renders and
components. This allows you to do neat stuff like preload data before your next
page or component has even started mounting.

#### useClick() [`@react-hook/click`](packages/click)

A React hook for conditionally firing a function when an element is
clicked - for instance if you only want a click even to fire on
double-clicks.

#### useCopy() [`@react-hook/copy`](packages/copy)

A React hook for copying text to the clipboard.

#### useCounter() [`@react-hook/counter`](packages/counter)

A counter implemented as a React hook.

#### useDebounce() [`@react-hook/debounce`](packages/debounce)

A React hook for debouncing setState and other callbacks.

#### useEvent() [`@react-hook/event`](packages/event)

A React hook for adding events to HTML elements. This hook cleans up your listeners
automatically when it unmounts. You won't have to worry about wrapping your
listener in a `useCallback()` because this hook makes sure your most recent callback
is always invoked.

#### useGoogleOptimize() [`@react-hook/google-optimize`](packages/google-optimize)

A React hook for adding Google Optimize variants to components.

#### useHotkey() [`@react-hook/hotkey`](packages/hotkey)

A React hook for invoking a callback when hotkeys are pressed. This hook also
provides interop between `event.key` and `event.which` - you provide a string, and
the library turns it into an `event.which` key code if it has to.

#### useHover() [`@react-hook/hover`](packages/hover)

A React hook for tracking the hover state of DOM elements in browsers
where hover is enabled. If the browser does not support hover states
(e.g. a phone) the `isHovering` value will always be `false`.

#### useIntersectionObserver() [`@react-hook/intersection-observer`](packages/intersection-observer)

A React hook for the IntersectionObserver API that uses a polyfill when the native API is not available.

#### useMediaQuery() [`@react-hook/media-query`](packages/media-query)

React hooks that update when media queries change between matched and unmatched states.

#### useMergedRef() [`@react-hook/merged-ref`](packages/merged-ref)

A React hook for merging multiple refs into one ref.

#### useMousePosition() [`@react-hook/mouse-position`](packages/mouse-position)

A React hook for tracking the position of the mouse as it moves around
an element.

#### usePassiveLayoutEffect() [`@react-hook/passive-layout-effect`](packages/passive-layout-effect)

A React hook that uses `useEffect()` on the server and `useLayoutEffect()` in the browser.

#### useResizeObserver() [`@react-hook/resize-observer`]

A React hook that fires a callback whenever `ResizeObserver` detects a change to its size.

#### useServerPromises() [`@react-hook/server-promises`](packages/server-promises)

A React hook for continuously rendering a React tree until no promises are pushed to server-promises's
context in a given render.

#### useSwitch() [`@react-hook/switch`](packages/switch)

A react hook for controlling a boolean value with toggle, on, and off callbacks.

#### useThrottle() [`@react-hook/throttle`](packages/throttle)

A React hook for throttling setState and other callbacks.

#### useTimeout() [`@react-hook/timeout`](packages/timeout)

A React hook that executes a callback after a timeout ms have been exceeded and the timeout has been started

#### useToggle() [`@react-hook/toggle`](packages/toggle)

A React hook for toggling between two values with a callback.

#### useWindowScroll() [`@react-hook/window-scroll`](packages/window-scroll)

A React hook for updating components when the scroll position of the window
on the y-axis changes.

#### useWindowSize() [`@react-hook/window-size`](packages/window-size)

React hooks for updating components when the size of the `window`
changes.

## Contributing

To contribute to this project, first:

1. Fork this repo to your account
2. `git clone https://github.com/[your-username]/react-hook.git`
3. `cd react-hook`

Packages must be installed individually. They must also be installed using the `yarn` packager. An example for working on `throttle`:

1. `cd packages/throttle`
2. `yarn install`

### Development scripts

Each individual package includes the following scripts:

- `build`: Builds CJS and ES modules, as well as types
- `build:cjs`: Builds CJS module
- `build:es`: Builds ES module
- `build:types`: Builds types
- `check-types`: Checks types
- `format`: Formats the package w/ Prettier
- `lint`: Lints the package w/ eslint
- `test`: Tests the package w/ Jest
- `validate`: Tests, lints, and checks types for the package

#### Watching the ES module build:

`yarn build:es -w`

#### Watching the CJS module build:

`yarn build:cjs -w`

#### Watching tests:

`yarn test --watch`

### Submitting a pull request

Prior to submitting a pull request please ensure that `yarn validate` passes. Please also include a tag with the packages you updated in your commit message e.g. `[throttle] Fixes issue where setState was not called on the leading edge`.

## LICENSE

MIT
