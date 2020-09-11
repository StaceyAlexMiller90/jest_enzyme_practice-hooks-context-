import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

//useEffect can only use mount not shallow
const setup = () => {
	//Clear the mock everytime as later tests will see previous
	//calls and count them
	mockGetSecretWord.mockClear()
	hookActions.getSecretWord = mockGetSecretWord
	return mount(<App />)
}

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-app')
	expect(component.length).toBe(1)
})

describe('getSecretWordCalls', () => {
	test('getSecretWord is called on app mount', () => {
		setup()
		expect(mockGetSecretWord).toHaveBeenCalled()
	})
	test('getSecretWord is not called on app update', () => {
		setup()
	})
})
