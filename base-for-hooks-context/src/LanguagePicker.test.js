import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import LanguagePicker from './LanguagePicker'

const mockSetLanguage = jest.fn()
const setup = () => {
	return shallow(<LanguagePicker setLanguage={mockSetLanguage} />)
}

test('renders without error', () => {
	const wrapper = setup()
	const languagePickerComponent = findByTestAttr(
		wrapper,
		'component-language-picker'
	)
	expect(languagePickerComponent.exists()).toBe(true)
})

test('does not throw warning with expected props', () => {
	checkProps(LanguagePicker, { setLanguage: jest.fn() })
})

test('calls setLanguage prop upon click', () => {
	const wrapper = setup()
	const iconComponents = findByTestAttr(wrapper, 'language-icon')
	const firstIcon = iconComponents.first()
	firstIcon.simulate('click')
	expect(mockSetLanguage).toHaveBeenCalled()
})

test('renders non zero language icons', () => {
	const wrapper = setup()
	const iconComponents = findByTestAttr(wrapper, 'language-icon')
	expect(iconComponents.length).toBeGreaterThan(0)
})
