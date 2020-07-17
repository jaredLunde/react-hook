<hr>
<div align="center">
  <h1 align="center">
    useMediaQuery()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/media-query">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/media-query?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/media-query">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/media-query?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/react-hook">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/react-hook?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/media-query">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/media-query?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/media-query?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/media-query</pre>
<hr>

React hooks that update when media queries change between matched and unmatched states.

## Quick Start

```jsx harmony
import {useMediaQuery, useMediaQueries} from '@react-hook/media-query'

// Using a single media query
const Component = () => {
  const matches = useMediaQuery('only screen and (min-width: 400px)')
  return `Matches? ${matches ? 'Matched!' : 'Nope :(')}`
}

// Using multiple media queries
const Component = () => {
  const {matches, matchesAny, matchesAll} = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 400px)'
  })

  return (
    <div>
      Screen matched? {matches.screen ? 'Yes' : 'No'}
      Width matched? {matches.width ? 'Yes' : 'No'}
      All matched? {matchesAll ? 'Yes' : 'No'}
      Any matched? {matchesAny ? 'Yes' : 'No'}
    </div>
  )
}
```

## API

### useMediaQuery(query)

A hook that returns `true` if the media query matched and `false` if not. This hook
will always return `false` when rendering on the server.

| Argument | Type     | Required? | Description                                                                          |
| -------- | -------- | --------- | ------------------------------------------------------------------------------------ |
| query    | `string` | Yes       | The media query you want to match against e.g. `"only screen and (min-width: 12em)"` |

#### Returns `boolean`

Returns `true` if the media query matched. This is always `false` when rendering on the server.

### useMediaQueries(queryMap)

A hook that returns a [`MediaQueryMatches`](#mediaquerymatches) object which will
tell you if specific media queries matched, all media queries matched, or
any media queries matched. Matches in this hook will always return `false` when
rendering on the server.

| Argument | Type                          | Required? | Description                                                                                       |
| -------- | ----------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| queryMap | `{[Name in keyof T]: string}` | Yes       | The media queries you want to match against e.g. `{screen: "screen", width: "(min-width: 12em)"}` |

#### Returns [`MediaQueryMatches`](#mediaquerymatches)

### MediaQueryMatches

```typescript
export interface MediaQueryMatches<T> {
  /**
   * Returns a map of query key/didMatch pairs
   */
  matches: Matches<T>
  /**
   * `true` if any of the media queries matched
   */
  matchesAny: boolean
  /**
   * `true` if all of the media queries matched
   */
  matchesAll: boolean
}
```

## LICENSE

MIT
