import React from 'react'
import { shallow, mount } from 'enzyme'

import successContext from './successContext'

// A functional component that calls useSuccess for the test
const FunctionalComponent = () => {
	successContext.useSuccess()
	return <div></div>
}

test('useSuccess throws an error if it is outside of SuccessProvider', () => {
	expect(() => {
		shallow(<FunctionalComponent />)
	}).toThrow('useSuccess must be used within a SuccessProvider')
})

test('useSuccess does not throw an error if it is inside of SuccessProvider', () => {
	expect(() => {
		mount(
			<successContext.SuccessProvider>
				<FunctionalComponent />
			</successContext.SuccessProvider>
		)
	}).not.toThrow()
})
