import moxios from 'moxios'
import { getSecretWord } from './hookActions'

describe('moxios tests', () => {
	// Tell requests to use moxios instead of axios
	beforeEach(() => {
		moxios.install()
	})
	afterEach(() => {
		moxios.uninstall()
	})
	test('calls the getSecretWord callback on axios response', async () => {
		const secretWord = 'party'
		//Mocking response from axios when random word server is called
		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({
				status: 200,
				response: secretWord,
			})
		})
		//create mock for callback argument
		const mockSetSecretWord = jest.fn()
		await getSecretWord(mockSetSecretWord)

		// See whether mock was run with the correct argument
		expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
	})
})
