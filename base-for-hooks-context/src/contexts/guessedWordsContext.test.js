import React from 'react'
import { shallow, mount } from 'enzyme'

import guessedWordsContext from './guessedWordsContext'

// A functional component that calls useSuccess for the test
const FunctionalComponent = () => {
	guessedWordsContext.useGuessedWords()
	return <div></div>
}

test('useGuessedWords throws an error if it is outside of GuessedWordsProvider', () => {
	expect(() => {
		shallow(<FunctionalComponent />)
	}).toThrow('useGuessedWords must be used within a GuessedWordsProvider')
})

test('useGuessedWords does not throw an error if it is inside of GuessedWordsProvider', () => {
	expect(() => {
		mount(
			<guessedWordsContext.GuessedWordsProvider>
				<FunctionalComponent />
			</guessedWordsContext.GuessedWordsProvider>
		)
	}).not.toThrow()
})
