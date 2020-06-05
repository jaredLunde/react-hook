import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
// import {render} from '@testing-library/react'
// import userEvent from '@testing-library/user-event
import useChange from './index'

describe('useChange()', () => {
  it('should call change handler when value changes', () => {
    const handleChange = jest.fn()

    const {result} = renderHook(() => {
      const [value, setValue] = React.useState('off')
      useChange(value, handleChange)
      return [value, setValue] as const
    })

    expect(result.current[0]).toBe('off')
    expect(handleChange).not.toBeCalled()
    act(() => result.current[1]('on'))
    expect(result.current[0]).toBe('on')
    expect(handleChange).toBeCalledWith('on', 'off')
  })

  it('should not call change handler when value does not change', () => {
    const handleChange = jest.fn()

    const {rerender} = renderHook(({value}) => useChange(value, handleChange), {
      initialProps: {value: 'off'},
    })

    expect(handleChange).not.toBeCalled()
    rerender({value: 'off'})
    expect(handleChange).not.toBeCalled()
    rerender({value: 'on'})
    expect(handleChange).toBeCalledWith('on', 'off')
  })
})
