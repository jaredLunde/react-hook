<div align="center">
  <h1 align="center">
    ↩ react-hook
    <br>
    <br>
  </h1>
</div>

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

#### useServerPromises() [`@react-hook/server-promises`](packages/server-promises)

A React hook for continuously rendering a React tree until no promises are pushed to server-promises's
context in a given render.

#### useSwitch() [`@react-hook/switch`](packages/switch)

A react hook for controlling a boolean value with toggle, on, and off callbacks.

#### useThrottle() [`@react-hook/throttle`](packages/throttle)

A React hook for throttling setState and other callbacks.

#### useToggle() [`@react-hook/toggle`](packages/toggle)

A React hook for toggling between two values with a callback.

#### useWindowScroll() [`@react-hook/window-scroll`](packages/window-scroll)

A React hook for updating components when the scroll position of the window
on the y-axis changes.

#### useWindowSize() [`@react-hook/window-size`](packages/window-size)

React hooks for updating components when the size of the `window`
changes.

## LICENSE

MIT
