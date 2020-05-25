import useEvent from '@react-hook/event'

export function useHotkey<T extends HTMLElement = HTMLElement>(
  target: Window | Document | T | React.RefObject<T> | null,
  hotkey: Hotkey | Hotkey[],
  callback: HotkeyCallback
): void {
  return useHotkeys<T>(target, [[hotkey, callback]])
}

export function useHotkeys<T extends HTMLElement = HTMLElement>(
  target: Window | Document | T | React.RefObject<T> | null,
  hotkeys: [Hotkey | Hotkey[], HotkeyCallback][]
): void {
  useEvent(target, 'keydown', (event) => {
    for (const [hotkey, callback] of hotkeys) {
      createHotkey(hotkey, callback)(event)
    }
  })
}

export const createHotkey = (
  hotkeys: Hotkey | Hotkey[],
  callback: HotkeyCallback
): HotkeyEventCallback => {
  hotkeys = Array.isArray(hotkeys) ? hotkeys : [hotkeys]
  const keys: Key[] = []
  let hasModifier = false

  for (let i = 0; i < hotkeys.length; i++) {
    let key = String(hotkeys[i]).toLowerCase()
    // @ts-ignore
    key = ALIASES[key] || key
    // @ts-ignore
    const modifier = MODIFIERS[key]
    hasModifier = hasModifier || !!modifier

    keys.push({
      // Store the key for browsers that support event.key
      key,
      // Store the keyCode for browsers that don't support event.key
      // @ts-ignore
      which: CODES[key] || key.toUpperCase().charCodeAt(0),
      // Is this key is a modifier? If so, include it's real name
      // as defined in the event here
      modifier: modifier,
    })
  }

  return (event: KeyboardEvent): void => {
    // Event was stopped earlier in the chain
    /* istanbul ignore next */
    if (event.defaultPrevented) return
    // Creates a list of modifiers defined in this event
    const eventModifiers: string[] = []

    for (const modifier in MODIFIERS) {
      // @ts-ignore
      const mod = MODIFIERS[modifier]
      // @ts-ignore
      if (event[mod]) {
        // If the event had a modifier and there wasn't one specified, just bail
        if (!hasModifier) return
        eventModifiers.push(mod)
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const expected = keys[i]

      if (expected.modifier) {
        // We expected this modifier and got it, continue
        const modIdx = eventModifiers.indexOf(expected.modifier)
        if (modIdx > -1) {
          eventModifiers.splice(modIdx, 1)
          continue
        }
        // We expected this modifier, but not this one so the key press isn't
        // valid. Thus, we bail.
        return
      }

      if (event.key) {
        // This browser has event.key
        const actual = event.key.toLowerCase()
        // The key didn't match the expected key and this isn't a modifier,
        // so bail
        if (actual !== expected.key) return
      } else {
        // This browser is still using event.which
        const actual = event.which
        // The key didn't match the expected key and this isn't a modifier,
        // so bail
        if (actual !== expected.which) return
      }
    }
    // There were modifiers in this keyboard event that weren't specified in
    // the hotkey
    if (eventModifiers.length) return
    // Hey we did it, let the callback invoke
    callback(event)
  }
}

const IS_MAC: boolean =
  typeof window !== 'undefined' &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)

export interface Modifiers {
  alt: 'altKey'
  control: 'ctrlKey'
  meta: 'metaKey'
  shift: 'shiftKey'
}

const MODIFIERS: Modifiers = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
}

export interface Aliases {
  break: 'pause'
  cmd: 'meta'
  command: 'meta'
  ctrl: 'control'
  del: 'delete'
  down: 'arrowdown'
  esc: 'escape'
  left: 'arrowleft'
  mod: 'meta' | 'control'
  option: 'alt'
  return: 'enter'
  right: 'arrowright'
  space: ' '
  spacebar: ' '
  up: 'arrowup'
  windows: 'meta'
}

/* istanbul ignore next */
const ALIASES: Aliases = {
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  windows: 'meta',
}

export interface SpecialCodes {
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

const CODES: SpecialCodes = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
  ...Array(20).reduce((acc, _, index) => {
    /* istanbul ignore next */
    acc[`f${index + 1}`] = 112 + index
  }, {}),
}

export type Hotkey =
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

type Key = {
  key: string
  which: number
  modifier: string
}

type HotkeyEventCallback = (event: KeyboardEvent) => void

export type HotkeyCallback = (event: KeyboardEvent) => void
