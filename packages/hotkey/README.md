<hr>
<div align="center">
  <h1 align="center">
    useHotkey()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@react-hook/hotkey">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@react-hook/hotkey?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@react-hook/hotkey">
    <img alt="Types" src="https://img.shields.io/npm/types/@react-hook/hotkey?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@react-hook/hotkey">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@react-hook/hotkey?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@react-hook/hotkey?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @react-hook/hotkey</pre>
<hr>

A React hook for invoking a callback when hotkeys are pressed. This hook also
provides interop between `event.key` and `event.which` - you provide a string, and
the library turns it into an `event.which` key code if it has to.

For better TypeScript support, this library doesn't have a special syntax à la
the `is-hotkey` package. It uses plain JS objects and your build will fail
if you've included a typo.

## Quick Start

```jsx harmony
import {useHotkey, useHotkeys} from '@react-hook/hotkey'

const OneHotkey = () => {
  const save = () => {} // save some doc
  // creates a hotkey for Command|Control + S keys
  const ref = useHotkey(['mod', 's'], save) // useHotkey<HTMLTextAreaElement>(['mod', 's'], exit)
  return <textarea ref={ref} />
}

const OneHotkeySingleCharacter = () => {
  const exit = () => {} // exit something
  // creates a hotkey for the escape key
  const ref = useHotkey('esc', exit) // useHotkey<HTMLTextAreaElement>('esc', exit)
  return <textarea ref={ref} />
}

const MultipleHotkeys = () => {
  const ref = useHotkeys(
    // Hotkey map
    [
      [['mod', 's'], save],
      [['mod', 'p'], print],
      ['esc', blur],
      ['enter', submit],
    ]
  )

  return <textarea ref={ref} />
}
```

## API

### `useHotkey<T = HTMLElement>(hotkey, callback): React.MutableRefObject<T>`

This is a hook for creating a single hotkey.

#### Arguments

| Argument | Type                                           | Required? | Description                                                                                                                                                                                                                                                         |
| -------- | ---------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hotkey   | [<code>Hotkey &#124; Hotkey[]</code>](#hotkey) | Yes       | When the key and all of the modifiers in a `keydown` event match those defined here, the callback below will be invoked. See [`SpecialCodes`](#specialcodes), [`Aliases`](#aliases), and [`Modifiers`](#modifiers) for possible keys in addition the standard keys. |
| callback | [`HotkeyCallback`](#hotkeycallback)            | Yes       | A callback that takes action on the hotkey event.                                                                                                                                                                                                                   |

#### Returns `React.MutableRefObject<T>`

### `useHotkeys<T = HTMLElement>(hotkeyMapping): React.MutableRefObject<T>`

This is a hook for creating multiple hotkeys that respond to a singular keyboard event.

#### Arguments

| Argument      | Type                                                                                    | Required? | Description                                                                      |
| ------------- | --------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------- |
| hotkeyMapping | [[<code>Hotkey &#124; Hotkey[]</code>](#hotkey), [`HotkeyCallback`](#hotkeycallback)][] | Yes       | These are the same arguments defined in `useHotkey`, but in a mapped array form. |

#### Returns `React.MutableRefObject<T>`

## Types

### `HotkeyCallback`

```typescript
type HotkeyCallback = (event: KeyboardEvent) => void
```

### `Hotkey`

```typescript
type Hotkey =
  | keyof SpecialCodes
  | keyof Modifiers
  | keyof Aliases
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 0
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
```

### `SpecialCodes`

```typescript
interface SpecialCodes {
  backspace: 8
  tab: 9
  enter: 13
  shift: 16
  control: 17
  alt: 18
  pause: 19
  capslock: 20
  escape: 27
  ' ': 32
  pageup: 33
  pagedown: 34
  end: 35
  home: 36
  arrowleft: 37
  arrowup: 38
  arrowright: 39
  arrowdown: 40
  insert: 45
  delete: 46
  meta: 91
  numlock: 144
  scrolllock: 145
  ';': 186
  '=': 187
  ',': 188
  '-': 189
  '.': 190
  '/': 191
  '`': 192
  '[': 219
  '\\': 220
  ']': 221
  "'": 222
  f1: 112
  f2: 113
  f3: 114
  f4: 115
  f5: 116
  f6: 117
  f7: 118
  f8: 119
  f9: 120
  f10: 121
  f11: 122
  f12: 123
  f13: 124
  f14: 125
  f15: 126
  f16: 127
  f17: 128
  f18: 129
  f19: 130
  f20: 131
}
```

### `Aliases`

```typescript
interface Aliases {
  break: 'pause'
  cmd: 'meta'
  command: 'meta'
  ctrl: 'control'
  del: 'delete'
  down: 'arrowdown'
  esc: 'escape'
  left: 'arrowleft'
  // will respond to the `command` key on a mac and
  // to the `control` key everywhere else
  mod: 'meta' | 'control'
  option: 'alt'
  return: 'enter'
  right: 'arrowright'
  space: ' '
  spacebar: ' '
  up: 'arrowup'
  windows: 'meta'
}
```

### `Modifiers`

```typescript
interface Modifiers {
  alt: 'altKey'
  control: 'ctrlKey'
  meta: 'metaKey'
  shift: 'shiftKey'
}
```

## Credits

Full credit for the key code interop portion goes to [Ian Storm Taylor](https://github.com/ianstormtaylor)
and his library [is-hotkey](https://github.com/ianstormtaylor/is-hotkey).

## LICENSE

MIT
