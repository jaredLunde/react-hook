import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
// import {render} from '@testing-library/react'
// import userEvent from '@testing-library/user-event
import usePrevious from './index'

describe('usePrevious()', () => {
  it('should pass', () => {
    const handleChange = jest.fn()
    const useChanged = (onChange: typeof handleChange) => {
      const [status, setStatus] = React.useState('off')
      const prevStatus = usePrevious(status, status)

      React.useEffect(() => {
        if (status !== prevStatus) onChange(status, prevStatus)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [status])

      return [status, setStatus] as const
    }

    const {result} = renderHook(() => useChanged(handleChange))
    expect(result.current[0]).toBe('off')
    expect(handleChange).not.toBeCalled()
    act(() => result.current[1]('on'))
    expect(result.current[0]).toBe('on')
    expect(handleChange).toBeCalledWith('on', 'off')
  })
})
