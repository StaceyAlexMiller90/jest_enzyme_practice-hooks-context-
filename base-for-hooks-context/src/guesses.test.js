import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import guessedWordsContext from './contexts/guessedWordsContext'
import successContext from './contexts/successContext'

import Input from './Input'
import GuessedWords from './GuessedWords'

const setup = (guessedWordsStrings = [], secretWord = 'party') => {
	const wrapper = mount(
		<guessedWordsContext.GuessedWordsProvider>
			<successContext.SuccessProvider>
				<Input secretWord={secretWord} />
				<GuessedWords />
			</successContext.SuccessProvider>
		</guessedWordsContext.GuessedWordsProvider>
	)
	const inputBox = findByTestAttr(wrapper, 'input-box')
	const submitButton = findByTestAttr(wrapper, 'submit-button')

	//Pre populating guessed words context
	guessedWordsStrings.map((word) => {
		const mockEvent = { target: { value: word } }
		inputBox.simulate('change', mockEvent)
		submitButton.simulate('click')
	})
	return [wrapper, inputBox, submitButton]
}
describe('non empty guessedWords', () => {
	describe('test word guesses', () => {
		let wrapper
		let inputBox
		let submitButton
		beforeEach(() => {
			;[wrapper, inputBox, submitButton] = setup(['agile'], 'party')
		})
		describe('when the guess is correct', () => {
			beforeEach(() => {
				const mockEvent = { target: { value: 'party' } }
				inputBox.simulate('change', mockEvent)
				submitButton.simulate('click')
			})
			test('input component contains no children when success is true', () => {
				const inputComponent = findByTestAttr(wrapper, 'component-input')
				expect(inputComponent.children().length).toBe(0)
			})
			test('number of rows in guessWords table reflects the number after guess update', () => {
				const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word')
				expect(guessedWordsRows.length).toBe(2)
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
			test('number of rows in guessWords table reflects the number after guess update', () => {
				const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word')
				expect(guessedWordsRows.length).toBe(2)
			})
		})
	})
})

describe('starting with empty guessedWords', () => {
	describe('test word guesses', () => {
		let wrapper
		let inputBox
		let submitButton

		beforeEach(() => {
			;[wrapper, inputBox, submitButton] = setup([], 'party')
		})
		test('number of guessWords rows in table updates after a guess', () => {
			const mockEvent = { target: { value: 'train' } }
			inputBox.simulate('change', mockEvent)
			submitButton.simulate('click')
			const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word')
			expect(guessedWordsRows.length).toBe(1)
		})
	})
})
