import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import successContext from './contexts/successContext'
import Input from './Input'

const setup = (secretWord = 'party') => {
	const wrapper = mount(
		<successContext.SuccessProvider>
			<Input secretWord={secretWord} />
		</successContext.SuccessProvider>
	)
	const inputBox = findByTestAttr(wrapper, 'input-box')
	const submitButton = findByTestAttr(wrapper, 'submit-button')
	return [wrapper, inputBox, submitButton]
}

describe('test word guesses', () => {
	let wrapper
	let inputBox
	let submitButton
	beforeEach(() => {
		;[wrapper, inputBox, submitButton] = setup('party')
	})
	describe('when the guess is correct', () => {
		beforeEach(() => {
			const mockEvent = { target: { value: 'party' } }
			inputBox.simulate('change', mockEvent)
			submitButton.simulate('submit')
		})
		test('input component contains no children when success is true', () => {
			const inputComponent = findByTestAttr(wrapper, 'component-input')
			expect(inputComponent.children().length).toBe(0)
		})
	})
	describe('when the guess is incorrect', () => {
		beforeEach(() => {
			const mockEvent = { target: { value: 'train' } }
			inputBox.simulate('change', mockEvent)
			submitButton.simulate('click')
		})
		test('input box remains when success is false', () => {
			expect(inputBox.exists()).toBe(true)
		})
	})
})
