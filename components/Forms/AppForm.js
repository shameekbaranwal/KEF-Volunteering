/*
	This is supposed to be another reuseable component. 
	It can be passed an array called inputs, which will store individual objects representing details about an individual input field in the form.
	It will also be passed a function called onSubmit, which it will call whenever the Submit button is pressed.
	Supports three types of inputs: text, picker and multiple-choice.
	I will add support for Date and Time inputs later on as time may permit. 
	This reuseable component will let us create a proper full-fledged form easily.
	The usage would be like:
		<AppForm inputs={FormSpecifications} onSubmit={onSubmit} />

	In the specification, you'll pass an array of objects. Each object can follow one of the following three templates, based on whether it is a text input, a picker input or a mcq input:

	Text Input: 
		{
			name: 'name',
			type: 'text',
			box: true, //if you want a surrounding box
			keyboardType: 'default',
			placeholder: 'eg: John Doe',
			question: 'Enter your name',
			style: styles.textinput,
			initial: '',
		}

	Picker Input:
		{
			name: 'gender',
			type: 'picker',
			box: true,
			question: 'Select your gender',
			options: ['Male', 'Female', 'Other'],
			style: styles.textinput,
			initial: 'Male',
		}


	Multiple Choice Input:
		{
			name: 'proficiency_english',
			type: 'multiple',
			box: true,
			question: 'Select your proficiencies in English.',
			options: ['Read', 'Write', 'Speak'],
			style: styles.textinput,
			initial: [
				{ name: 'Read', state: false },
				{ name: 'Write', state: false },
				{ name: 'Speak', state: false },
			],
			// initial: [false, false, false],
		}
*/

import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Colors from '../../constants/Colors.js'
import AppButton from '../AppButton.js'
import AppFormField from './InputFields/AppFormField.js'

export default function AppForm({ inputs, onSubmit }) {
	return (
		<View style={styles.container}>
			<Formik
				initialValues={getInitValues(inputs)}
				onSubmit={onSubmit}
				validationSchema={getValidationSchema(inputs)}
				validateOnBlur={false}
			>
				{({
					handleChange,
					handleSubmit,
					values,
					setFieldValue,
					setFieldTouched,
					errors,
					touched,
				}) => (
					<ScrollView
						style={styles.scrollContainer}
						contentContainerStyle={styles.container}
					>
						{inputs.map((input, index) => {
							return (
								<AppFormField
									key={input.name}
									inputData={input}
									value={values[input.name]}
									onValueChange={handleChange(input.name)}
									setFieldValue={setFieldValue}
									setFieldTouched={() =>
										setFieldTouched(input.name)
									}
									name={input.name} //passing this for AppMultipleInput
									error={errors[input.name]}
									touched={touched[input.name]}
								/>
							)
						})}
						<AppButton
							title='SUBMIT'
							onPress={() => {
								handleSubmit(values)
								for (let inp of inputs) {
									if (errors[inp.name]) {
										alert(
											'There are some errors with your entries. Please recheck, and try again.',
										)
										return
									}
								}
							}}
							styleTextFontColor={{ color: Colors.primary }}
							styleButton={styles.submitButton}
						/>
					</ScrollView>
				)}
			</Formik>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		paddingBottom: '8%',
		marginBottom: '5%',
		marginTop: '4%',
		borderColor: 'white',
	},
	scrollContainer: {
		width: '100%',
	},

	submitButton: {
		width: 150,
		height: 60,
		backgroundColor: Colors.third,
		marginTop: 20,
		padding: 25,
	},
})

const getInitValues = (inputs) => {
	const inits = {}
	inputs.forEach((inp) => {
		//for all of them, just use the initial value being provided
		inits[inp.name] = inp.initial
		//but if it is a dropdown picker input field, keep 'Not Selected' label as default value.
		//this '' initial value is handled in the AppPicker.js component itself. 'Not Selected' is the default label and '' is its value.
		if (inp.type === 'picker') inits[inp.name] = ''
	})

	return inits
}

const getValidationSchema = (inputs) => {
	const validationSchema = {}
	inputs.forEach((inp) => {
		//for most input fields, no validation
		validationSchema[inp.name] = null
		// for text fields, the validation is provided while generating the form specifications
		if (inp.type === 'text') validationSchema[inp.name] = inp.validation
		//for picker field, a default validation is needed such that a user NEEDS to make a selection.
		if (inp.type === 'picker')
			validationSchema[inp.name] =
				inp.validation ||
				Yup.string().test(
					'picker',
					'Please make a selection',
					(value) => {
						// console.log(value)
						return value
					},
				)
	})
	// console.log(inputs.name)
	return Yup.object().shape(validationSchema)
}
