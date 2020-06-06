import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useClick from './index'

describe('click', () => {
  it('should capture double click', () => {
    const callback = jest.fn()

    const Component = () => {
      const onClick = useClick('double', callback)
      return <button onClick={onClick} />
    }

    render(<Component />)

    userEvent.click(screen.getByRole('button'))
    expect(callback).not.toBeCalled()
    userEvent.dblClick(screen.getByRole('button'))
    expect(callback).toBeCalled()
  })

  it('should capture double right click', () => {
    const callback = jest.fn()

    const Component = () => {
      const onClick = useClick('double+shift', callback)
      return <button onClick={onClick} />
    }

    render(<Component />)

    userEvent.dblClick(screen.getByRole('button'))
    expect(callback).not.toBeCalled()
    userEvent.dblClick(screen.getByRole('button'), {shiftKey: true})
    expect(callback).toBeCalled()
  })

  it('should capture double right click w/ array', () => {
    const callback = jest.fn()

    const Component = () => {
      const onClick = useClick(['double', 'shift'], callback)
      return <button onClick={onClick} />
    }

    render(<Component />)

    userEvent.dblClick(screen.getByRole('button'))
    expect(callback).not.toBeCalled()
    userEvent.dblClick(screen.getByRole('button'), {shiftKey: true})
    expect(callback).toBeCalled()
  })

  it('should capture right or left click, but not middle', () => {
    const callback = jest.fn()

    const Component = () => {
      const onClick = useClick('left|right', callback)
      return <button onClick={onClick} />
    }

    render(<Component />)

    userEvent.click(screen.getByRole('button'), {button: 0})
    expect(callback).toBeCalledTimes(1)
    userEvent.click(screen.getByRole('button'), {button: 1})
    expect(callback).toBeCalledTimes(1)
  })

  it('should capture ANDs', () => {
    const callback = jest.fn()

    const Component = () => {
      const onClick = useClick('left+shift', callback)
      return <button onClick={onClick} />
    }

    render(<Component />)

    userEvent.click(screen.getByRole('button'))
    expect(callback).toBeCalledTimes(0)
    userEvent.click(screen.getByRole('button'), {shiftKey: true})
    expect(callback).toBeCalledTimes(1)
  })
})
