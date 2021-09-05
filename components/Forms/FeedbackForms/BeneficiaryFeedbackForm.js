import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'
import helper from '../../../utilities.js'
import apiBeneficiaryFeedback from '../../../api/postNewBeneficiaryFeedback.js'
import AppContext from '../../AppContext.js'

const BeneficiaryFeedbackForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			BeneficiaryFeedbackFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		const body = [bodyData]
		const token = globalContext.token

		apiBeneficiaryFeedback
			.postNewBeneficiaryFeedback(body, token)
			.then((response) => {
				setShowLoading(false)
				console.log(response.data.info)
				if (response.ok) {
					alert(
						`Thank you for filling the feedback form, ${values.name}`,
					)
					props.returnToHome()
				} else
					alert(
						`There was an error in submitting the form. Please try again.`,
					)
			})
			.catch((error) => {
				console.error(error)
				alert(
					`There was an error in submitting the form. Please try again.`,
				)
			})
	}

	return (
		<>
			<AppForm
				inputs={BeneficiaryFeedbackFormSpecifications}
				onSubmit={onSubmit}
			/>
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
})

const BeneficiaryFeedbackFormSpecifications = [
	//name
	{
		name: 'name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: 'Enter your full name',
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

	//Date of activity
	{
		name: 'date_of_activity',
		type: 'date',
		box: true,
		initial: new Date(),
		max: new Date(),
		question: 'Select the date of activity',
	},

	//name of the trainer your feedback is for
	{
		name: 'name_of_trainer',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: "Enter the trainer's full name",
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.required('This field is required.')
			.test(
				'name',
				'Please enter only the first name and last name. If there is a middle name, omit it for this form.',
				helper.nameValidation,
			),
	},

	//type of activity your feedback is for
	{
		name: 'name_of_activity',
		type: 'picker',
		box: true,
		question: 'Select the name of the activity',
		options: ['Teaching', 'Training', 'Counselling'],
		style: styles.textinput,
		initial: 'Teaching',
	},

	//duration of the activity
	{
		name: 'duration',
		type: 'picker',
		box: true,
		question: 'Select the duration of the activity',
		options: [
			'30 minutes',
			'1 hour',
			'1.5 hours',
			'2 hours',
			'2.5 hours',
			'3 hours',
			'3.5 hours',
			'4 hours',
		],
		style: styles.textinput,
		initial: '1 hour',
	},

	//rate subject content
	{
		name: 'subject_content_rating',
		type: 'picker',
		box: true,
		question: 'Rate the subject content taught in the session',
		options: ['Outstanding', 'Very good', 'Good', 'Did not understand'],
		style: styles.textinput,
		initial: 'Very good',
	},

	//rate interaction encouragement
	{
		name: 'interaction_rating',
		type: 'picker',
		box: true,
		question:
			'Rate how well the trainer/teacher encouraged participation and interaction in the session',
		options: ['Outstanding', 'Very good', 'Good', 'Not enough'],
		style: styles.textinput,
		initial: 'Very good',
	},

	//rate trainer knowledge
	{
		name: 'knowledge_rating',
		type: 'picker',
		box: true,
		question:
			'Rate how well the trainer/teacher seemed prepared and knowledgeable',
		options: [
			'Outstanding',
			'Very good',
			'Good',
			'Did not seem prepared and knowledgeable',
		],
		style: styles.textinput,
		initial: 'Very good',
	},

	//rate trainer questions
	{
		name: 'questions_rating',
		type: 'picker',
		box: true,
		question: 'Rate how well the trainer/teacher answered your questions',
		options: ['Outstanding', 'Very good', 'Good', 'Did not answer well'],
		style: styles.textinput,
		initial: 'Very good',
	},

	//learning outcomes
	//name of the trainer your feedback is for
	{
		name: 'learning_outcomes',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: Practiced English speaking.',
		question: "List down the learning from today's session",
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},
]

export default BeneficiaryFeedbackForm
