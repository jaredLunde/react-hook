/* jest */
import * as React from 'react'
import {render as renderComponent} from '@testing-library/react'
import useMergedRef from './index'

const render = (children: any): any => renderComponent(children)

it('merges object and function refs', () => {
  const refValues: any = {}
  const RefComponent: React.FC = () => {
    const refA = React.useRef<HTMLDivElement>(null)
    const refB_ = React.useRef<HTMLDivElement>(null)
    const refB = (el: HTMLDivElement): void => {
      refB_.current = el
    }
    const ref = useMergedRef(refA, refB)
    React.useEffect(() => {
      refValues.a = refA.current
      refValues.b = refB_.current
    })

    return React.createElement('div', {ref})
  }
  render(React.createElement(RefComponent))
  expect(refValues.a).toBe(refValues.b)
  expect(refValues.b).toMatchSnapshot()
})
