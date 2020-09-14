import React from 'react'
import PropTypes from 'prop-types'
import successContext from './contexts/successContext'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'

const Input = ({ secretWord }) => {
	const [currentGuess, setCurrentGuess] = React.useState('')
	const language = React.useContext(languageContext)
	const [success, setSuccess] = successContext.useSuccess()

	const handleSubmit = (e) => {
		e.preventDefault()
		setCurrentGuess('')
		//Update guessedwords context
		//Check against secret word and
		//Update success context
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
					onSubmit={handleSubmit}
					type="submit"
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
