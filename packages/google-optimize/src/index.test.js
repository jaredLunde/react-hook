/* jest */
// import React from 'react'
// import {renderHook} from '@testing-library/react-hooks'
// import {render} from '@testing-library/react'
const hello = world => `hello ${world}`

test('passes', () => {
  expect(hello('world')).toMatchSnapshot()
})
