import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ secretWord }) => {
	const [currentGuess, setCurrentGuess] = React.useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		setCurrentGuess('')
		//Update guessedwords context
		//Check against secret work and
		//Update success context
	}

	return (
		<div data-test="component-input">
			<form className="form-inline">
				<input
					data-test="input-box"
					className="mb-2 mx-sm-3"
					type="text"
					placeholder="Take a guess!"
					value={currentGuess}
					onChange={(e) => setCurrentGuess(e.target.value)}
				></input>
				<button
					data-test="submit-button"
					onSubmit={handleSubmit}
					type="submit"
					className="btn btn-primary mb-2"
				>
					Submit
				</button>
			</form>
		</div>
	)
}
Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
}
export default Input
