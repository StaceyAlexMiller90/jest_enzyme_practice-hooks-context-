import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

const defaultProps = {
	secretWord: '',
}

const setup = (secretWord = 'party') => {
	return shallow(<Input secretWord={secretWord} />)
}

test('Input renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-input')
	expect(component.length).toBe(1)
})

test('does not throw warning with expected props', () => {
	checkProps(Input, defaultProps)
})

describe('state controlled input field', () => {
	let mockSetCurrentGuess = jest.fn()
	let wrapper
	beforeEach(() => {
		//Important to ensure new version each time
		mockSetCurrentGuess.mockClear()
		//Mocking React Use State hook by returning piece of state & setState function
		React.useState = jest.fn(() => ['', mockSetCurrentGuess])
		wrapper = setup()
	})
	test('state updates with value of input box upon change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box')
		//Mock the event object on change to pass into simulate
		const mockEvent = { target: { value: 'train' } }
		inputBox.simulate('change', mockEvent)
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
	})
	test('state clears when submit button is clicked', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button')
		const mockEvent = { preventDefault() {} }
		submitButton.simulate('submit', mockEvent)
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
	})
})
