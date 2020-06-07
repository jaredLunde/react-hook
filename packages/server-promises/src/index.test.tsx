import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {renderToString} from 'react-dom/server'
import {useServerPromises, loadPromises} from './index'

describe('useServerPromises()', () => {
  it('should add promises', () => {
    const {result} = renderHook(() => useServerPromises())
    result.current.push(Promise.resolve('foo'))
    expect(result.current.promises.length).toBe(1)
  })

  it('should render to string w/ resolved promises', async () => {
    const Component = ({value, stop = false}) => {
      const {push} = useServerPromises()

      React.useEffect(() => {
        push(Promise.resolve(value))
      }, [push, value])

      return (
        <div>
          {value} {!stop && <Component value='world' stop />}
        </div>
      )
    }

    const html = await loadPromises(<Component value='Hello' />)
    expect(html).toMatchSnapshot(`
      <div>
        Hello <div>world</div>
      </div>
    `)
  })

  it('should use custom renderer', async () => {
    const Component = ({value, stop = false}) => {
      const {push} = useServerPromises()

      React.useEffect(() => {
        push(Promise.resolve(value))
      }, [push, value])

      return (
        <div>
          {value} {!stop && <Component value='world' stop />}
        </div>
      )
    }

    const html = await loadPromises(<Component value='Hello' />, renderToString)
    expect(html).toMatchSnapshot(`
      <div>
        Hello <div>world</div>
      </div>
    `)
  })
})
