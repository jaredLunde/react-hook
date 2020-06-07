/// <reference types="react" />
export declare function useHotkey<T extends Window = Window>(
  target: Window | null,
  hotkey: Hotkey | Hotkey[],
  callback: HotkeyCallback
): void
export declare function useHotkey<T extends Document = Document>(
  target: Document | null,
  hotkey: Hotkey | Hotkey[],
  callback: HotkeyCallback
): void
export declare function useHotkey<T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T> | T | null,
  hotkey: Hotkey | Hotkey[],
  callback: HotkeyCallback
): void
export declare function useHotkeys<T extends Window = Window>(
  target: Window | null,
  hotkeys: [Hotkey | Hotkey[], HotkeyCallback][]
): void
export declare function useHotkeys<T extends Document = Document>(
  target: Document | null,
  hotkeys: [Hotkey | Hotkey[], HotkeyCallback][]
): void
export declare function useHotkeys<T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T> | T | null,
  hotkeys: [Hotkey | Hotkey[], HotkeyCallback][]
): void
export declare const createHotkey: (
  hotkeys: Hotkey | Hotkey[],
  callback: HotkeyCallback
) => HotkeyEventCallback
export interface Modifiers {
  alt: 'altKey'
  control: 'ctrlKey'
  meta: 'metaKey'
  shift: 'shiftKey'
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
export declare type Hotkey =
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
declare type HotkeyEventCallback = (event: KeyboardEvent) => void
export declare type HotkeyCallback = (event: KeyboardEvent) => void
export {}
