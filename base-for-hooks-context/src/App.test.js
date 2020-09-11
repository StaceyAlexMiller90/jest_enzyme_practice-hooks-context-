import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

//useEffect can only use mount not shallow
const setup = (secretWord = 'party') => {
	//Clear the mock everytime as later tests will see previous
	//calls and count them
	mockGetSecretWord.mockClear()
	hookActions.getSecretWord = mockGetSecretWord
	const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()])
	React.useReducer = mockUseReducer
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
		const wrapper = setup()
		//Clear the call after the setup
		mockGetSecretWord.mockClear()
		//Enzymes wrapper.update() method does not trigger useEffect
		//setProps as an alternative
		wrapper.setProps()
		expect(mockGetSecretWord).not.toHaveBeenCalled()
	})
})

describe('When secret word is not null', () => {
	let wrapper
	beforeEach(() => {
		wrapper = setup('party')
	})
	test('renders app when secret word is not null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app')
		expect(appComponent.exists()).toBe(true)
	})
	test('does not render loading spinner when secret word is not null', () => {
		const spinnerComponent = findByTestAttr(wrapper, 'spinner')
		expect(spinnerComponent.exists()).toBe(false)
	})
})

describe('When secret word is null', () => {
	let wrapper
	beforeEach(() => {
		wrapper = setup(null)
	})
	test('does not render app when secret word is null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app')
		expect(appComponent.exists()).toBe(false)
	})
	test('renders loading spinner when secret word is null', () => {
		const spinnerComponent = findByTestAttr(wrapper, 'spinner')
		expect(spinnerComponent.exists()).toBe(true)
	})
})
