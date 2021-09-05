import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import apiBeneficiaries from '../../../api/registerNewBeneficiary.js'
import helper from '../../../utilities.js'
import Colors from '../../../constants/Colors.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'

const JoinUsBeneficiaryForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			JoinUsBeneficiaryFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		bodyData.splice(2, 0, '') //for the image link cause we don't have that.

		const body = [bodyData]

		apiBeneficiaries
			.postNewBeneficiary(body)
			.then((response) => {
				setShowLoading(false)
				console.log(response.data.info)
				if (response.ok) {
					alert(`Thank you for filling the form, ${values.name}!`)
					props.returnToHome()
				} else
					alert(
						`There was an error in submitting the form. Please try again.`,
					)
			})
			.catch((error) => {
				alert(
					`There was an error in submitting the form. Please try again.`,
				)
			})
	}

	return (
		<>
			<AppForm
				inputs={JoinUsBeneficiaryFormSpecifications}
				onSubmit={onSubmit}
			/>
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.7,
		backgroundColor: Colors.dark,
	},
})

const JoinUsBeneficiaryFormSpecifications = [
	{
		name: 'name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: 'Enter your name',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.required('This field is required.')
			.test(
				'name',
				'Please enter only your first name and last name. If you have a middle name, omit it for this form.',
				helper.nameValidation,
			),
	},
	{
		name: 'gender',
		type: 'picker',
		box: true,
		question: 'Select your gender',
		options: ['Male', 'Female', 'Other'],
		style: styles.textinput,
		initial: 'Male',
	},
	{
		name: 'phone',
		type: 'text',
		box: true,
		keyboardType: 'numeric',
		question: 'Enter your phone number',
		placeholder: 'eg: 9876543210',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.length(10, 'Please enter a valid 10-digit phone number.')
			.required('This field is required.'),
	},
	{
		name: 'email',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: abcd@gmail.com',
		question: 'Enter your email address',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.email('Please enter a valid email address.')
			.required('This field is required.'),
	},
	{
		name: 'intervention',
		type: 'picker',
		box: true,
		question:
			'Select the name of the intervention you are benefitting from',
		options: [
			'GURU',
			'LEAD',
			'EXCEL',
			'Unnati',
			'Parvarish',
			'SCD',
			'Umang',
			'Health',
			'Communication',
			'E&P',
			'Volunteering',
			'NIRMAAN',
			'HR',
			'Accounts',
			'CEO Office',
		],
		style: styles.textinput,
		initial: 'GURU',
	},
]

export default JoinUsBeneficiaryForm
