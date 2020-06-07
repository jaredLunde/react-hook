/* jest */
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {useHotkey, useHotkeys} from './index'

describe('useHotkey', () => {
  it('should invoke callback with singular key', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, 'a', fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A'})
    expect(fn).toBeCalled()
  })

  it('should invoke callback with modified key', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, ['ctrl', 'a'], fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A', ctrlKey: true})
    expect(fn).toBeCalled()
  })

  it('should invoke callback for both ctrl and meta modifiers with special mod key', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, ['mod', 'a'], fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A', ctrlKey: true})
    expect(fn).toBeCalledTimes(1)
  })

  it('should not invoke callback if defined modifier was not apart of the press', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, ['ctrl', 'a'], fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A'})
    expect(fn).not.toBeCalled()
  })

  it('should not invoke callback if a modifier was part of the press, but not defined as a modifier', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, ['a'], fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A', ctrlKey: true})
    expect(fn).not.toBeCalled()
  })

  it('should not invoke callback if there were multiple modifiers sent, but not all were defined', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey<HTMLDivElement>(ref, ['a', 'ctrl'], fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {
      key: 'A',
      ctrlKey: true,
      shiftKey: true,
    })
    expect(fn).not.toBeCalled()
  })

  it('should invoke callback when which matches', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, 'j', fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {which: 74})
    expect(fn).toBeCalled()
  })

  it('should not invoke callback when which does not match', () => {
    const fn = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkey(ref, 'j', fn)
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fn).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {which: 75})
    expect(fn).not.toBeCalled()
  })
})

describe('useHotkeys', () => {
  it('should invoke callback for multiple hotkeys', () => {
    const fnA = jest.fn()
    const fnB = jest.fn()
    const Hotkey = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      useHotkeys<HTMLDivElement>(ref, [
        ['a', fnA],
        ['b', fnB],
      ])
      return <div data-testid='area' ref={ref} />
    }
    render(<Hotkey />)
    expect(fnA).not.toBeCalled()
    expect(fnB).not.toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'B'})
    expect(fnA).not.toBeCalled()
    expect(fnB).toBeCalled()
    fireEvent.keyDown(screen.getByTestId('area'), {key: 'A'})
    expect(fnA).toBeCalled()
  })
})
