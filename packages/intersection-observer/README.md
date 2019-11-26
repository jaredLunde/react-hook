<hr>
<div align="center">
  <h1 align="center">
    useIntersectionObserver()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/intersection-observer">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/intersection-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/intersection-observer">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/intersection-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/intersection-observer">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/intersection-observer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/intersection-observer?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/intersection-observer</pre>
<hr>
A React hook for the IntersectionObserver API that uses a polyfill when the native API is not available

The Intersection Observer API provides a way to asynchronously observe changes in
the intersection of a target element with an ancestor element or with a top-level document's viewport. The ancestor
element or viewport is referred to as the root.

When an IntersectionObserver is created, it's configured to watch for given ratios of visibility within the root. The
configuration cannot be changed once the IntersectionObserver is created, so a given observer object is only useful for
watching for specific changes in degree of visibility.

## Quick Start

```jsx harmony
import useIntersectionObserver from '@react-hook/intersection-observer'

const Component = () => {
  const [entry, observerRef] = useIntersectionObserver()
  return <div ref={observerRef}>Is intersecting? {entry.isIntersecting}</div>
}
```

## API

### `useIntersectionObserver(options?: IntersectionObserverOptions)`

#### IntersectionObserverOptions

| Property              | Type                              | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| root                  | `DOMElement`                      | `document`  | A specific ancestor of the target element being observed. If no value was passed to the constructor or this is `null`, the top-level document's viewport is used                                                                                                                                                                                                                                                                                                                                                                                                               |
| rootMargin            | `string`                          | `"0 0 0 0"` | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections.                                                                                                                                                                                                                                                                                     |
| thresholds            | <code>Number&#124;Number[]</code> | `0`         | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of `0.5`. If you want the callback to run every time visibility passes another 25%, you would specify the array `[0, 0.25, 0.5, 0.75, 1]`. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. |
| pollInterval          | `Number`                          | `null`      | The frequency in which the polyfill polls for intersection changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| useMutationObserver   | `bool`                            | `true`      | You can also choose to not check for intersections in the polyfill when the DOM changes by setting this to `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| initialIsIntersecting | `bool`                            | `false`     | Changes the default value of `isIntersecting` for use in places like SSR                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

#### Returns `[entry: IntersectionObserverEntry, ref: (element: HTMLElement) => void]`

| Variable | Type                        | Description                                                                                                                                                                 |
| -------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| entry    | `IntersectionObserverEntry` | This is the [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object returned by the `IntersectionObserver` callback. |
| ref      | `React.ref`                 | Provide this to the React element you want to monitor via the `ref` property                                                                                                |

## LICENSE

MIT
