import stringsModule from './strings'
const { getStringByLanguage } = stringsModule

const strings = {
	en: { submit: 'submit' },
	emoji: { submit: '🚀' },
	mermish: {},
}

describe('langugage string testing', () => {
	//To avoid the warning appearing in the tests when we expect
	//them, but to allow warnings when we dont
	const mockWarn = jest.fn()
	let originalWarn

	beforeEach(() => {
		originalWarn = console.warn
		console.warn = mockWarn
	})

	afterEach(() => {
		console.warn = originalWarn
	})

	test('returns correct submit string for english', () => {
		const string = getStringByLanguage('en', 'submit', strings)
		expect(string).toBe('submit')
		expect(mockWarn).not.toHaveBeenCalled()
	})

	test('returns correct submit string for emoji', () => {
		const string = getStringByLanguage('emoji', 'submit', strings)
		expect(string).toBe('🚀')
		expect(mockWarn).not.toHaveBeenCalled()
	})

	test('returns english string if language is not found', () => {
		const string = getStringByLanguage('nonExistentLanguage', 'submit', strings)
		expect(string).toBe('submit')
		expect(mockWarn).toHaveBeenCalledWith(
			'Could not get string [submit] for language [nonExistentLanguage]'
		)
	})

	test('returns english string if submit key is not found in language', () => {
		const string = getStringByLanguage('mermish', 'submit', strings)
		expect(string).toBe('submit')
		expect(mockWarn).toHaveBeenCalledWith(
			'Could not get string [submit] for language [mermish]'
		)
	})
})
