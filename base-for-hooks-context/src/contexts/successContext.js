import React from 'react'

//Kent Dodd method to create a custom context with state embedded

const successContext = React.createContext()

const useSuccess = () => {
	const context = React.useContext(successContext)
	if (!context) {
		throw new Error('useSuccess must be used within a SuccessProvider')
	}
	return context
}

const SuccessProvider = (props) => {
	const [success, setSuccess] = React.useState(false)
	const value = React.useMemo(() => [success, setSuccess], [success])
	return (
		<successContext.Provider value={value} {...props}></successContext.Provider>
	)
}

export default { SuccessProvider, useSuccess }
