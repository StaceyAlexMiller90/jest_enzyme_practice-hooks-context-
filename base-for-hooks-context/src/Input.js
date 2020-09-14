import React from 'react'
import PropTypes from 'prop-types'
import { getLetterMatchCount } from './helpers'
import guessedWordsContext from './contexts/guessedWordsContext'
import successContext from './contexts/successContext'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'

const Input = ({ secretWord }) => {
	const [currentGuess, setCurrentGuess] = React.useState('')
	const language = React.useContext(languageContext)
	const [success, setSuccess] = successContext.useSuccess()
	const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (currentGuess === secretWord) {
			setSuccess(true)
		}
		const letterMatchCount = getLetterMatchCount(currentGuess, secretWord)
		const newGuessedWords = [
			...guessedWords,
			{ guessedWord: currentGuess, letterMatchCount },
		]
		setGuessedWords(newGuessedWords)
		setCurrentGuess('')
	}

	if (success) {
		return null
	}

	return (
		<div data-test="component-input">
			<form className="form-inline">
				<input
					data-test="input-box"
					className="mb-2 mx-sm-3"
					type="text"
					placeholder={stringsModule.getStringByLanguage(
						language,
						'guessInputPlaceholder'
					)}
					value={currentGuess}
					onChange={(e) => setCurrentGuess(e.target.value)}
				></input>
				<button
					data-test="submit-button"
					onClick={handleSubmit}
					className="btn btn-primary mb-2"
				>
					{stringsModule.getStringByLanguage(language, 'submit')}
				</button>
			</form>
		</div>
	)
}
Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
}
export default Input
