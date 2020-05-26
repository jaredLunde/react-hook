import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import useEvent from './index'

describe('useEvent()', () => {
  it('should add events to ref object', () => {
    const Component = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      const [foo, setFoo] = React.useState('')
      useEvent(ref, 'click', () => setFoo('bar'))
      return (
        <div data-testid="foo" ref={ref}>
          {foo}
        </div>
      )
    }

    const {getByTestId, unmount} = render(<Component />)
    expect(getByTestId('foo').innerHTML).toBe('')
    fireEvent.click(getByTestId('foo'))
    expect(getByTestId('foo').innerHTML).toBe('bar')
    unmount()
  })

  it('should add events to document', () => {
    const Component = () => {
      const [foo, setFoo] = React.useState('')
      useEvent(document, 'click', () => setFoo('bar'))
      useEvent(document, 'click', () => setFoo('bar'))
      return <div data-testid="foo">{foo}</div>
    }

    const {getByTestId, unmount} = render(<Component />)
    expect(getByTestId('foo').innerHTML).toBe('')
    fireEvent.click(document)
    expect(getByTestId('foo').innerHTML).toBe('bar')
    unmount()
  })

  it('should add events to window', () => {
    const Component = () => {
      const [foo, setFoo] = React.useState('')
      useEvent(window, 'click', () => setFoo('bar'))
      return <div data-testid="foo">{foo}</div>
    }

    const {getByTestId, unmount} = render(<Component />)
    expect(getByTestId('foo').innerHTML).toBe('')
    fireEvent.click(window)
    expect(getByTestId('foo').innerHTML).toBe('bar')
    unmount()
  })
})
