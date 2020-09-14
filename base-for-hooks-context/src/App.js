import React from 'react'
import hookActions from './actions/hookActions'
import languageContext from './contexts/languageContext'
import successContext from './contexts/successContext'
import guessedWordsContext from './contexts/guessedWordsContext'

import LanguagePicker from './LanguagePicker'
import Input from './Input'
import Congrats from './Congrats'
import GuessedWords from './GuessedWords'

import './App.css'

//As per Redux reducer
const reducer = (state, action) => {
	switch (action.type) {
		case 'setSecretWord':
			return { ...state, secretWord: action.payload }
		case 'setLanguage':
			return { ...state, language: action.payload }
		default:
			throw new Error(`Invalid action type: ${action.type}`)
	}
}

const App = () => {
	const [state, dispatch] = React.useReducer(reducer, {
		secretWord: null,
		language: 'en',
	})

	const setSecretWord = (secretWord) => {
		dispatch({ type: 'setSecretWord', payload: secretWord })
	}

	const setLanguage = (language) => {
		dispatch({ type: 'setLanguage', payload: language })
	}

	React.useEffect(() => {
		hookActions.getSecretWord(setSecretWord)
	}, [])

	if (!state.secretWord) {
		return (
			<div className="container" data-test="spinner">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<p>Loading secret word</p>
			</div>
		)
	}

	return (
		<div className="container" data-test="component-app">
			<h1>Jotto</h1>
			<p>the secret word is {state.secretWord}</p>
			<languageContext.Provider value={state.language}>
				<LanguagePicker setLanguage={setLanguage} />
				<guessedWordsContext.GuessedWordsProvider>
					{/* Value in baked into SuccessProvider */}
					<successContext.SuccessProvider>
						<Congrats />
						<Input secretWord={state.secretWord} />
						<GuessedWords />
					</successContext.SuccessProvider>
					{/* <GuessedWords /> */}
				</guessedWordsContext.GuessedWordsProvider>
			</languageContext.Provider>
		</div>
	)
}

export default App
