/*
    Just a component that will contain the AppForm.
    Is referenced in the LoginScreen screen.
    Made a separate component to abstract out the implementation details.
*/

import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'

export default function LoginForm({ onSubmit }) {
	return (
		<View style={styles.container}>
			<AppForm
				inputs={LoginFormSpecifications}
				onSubmit={(values) => {
					onSubmit(values)
					console.log('Tried to log in with: ')
					console.log(values)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textinput: {},
	container: {
		width: '100%',
		// flex: 1,
		alignItems: 'center',
	},
})

const LoginFormSpecifications = [
	{
		name: 'email',
		type: 'text',
		box: false,
		keyboardType: 'default',
		placeholder: 'Enter your Email ID',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.email('Please enter a valid email ID.')
			.required('This field is required.'),
	},
	{
		name: 'phone',
		type: 'text',
		keyboardType: 'numeric',
		box: false,
		placeholder: 'Enter your phone number',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.length(10, 'Please enter a valid 10-digit phone number.')
			.required('This field is required.'),
	},
]
