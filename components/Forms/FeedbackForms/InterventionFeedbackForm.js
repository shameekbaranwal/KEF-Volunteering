import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'
import helper from '../../../utilities.js'
import apiInterventionFeedback from '../../../api/postNewInterventionFeedback.js'
import AppContext from '../../AppContext.js'

const InterventionFeedbackForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			InterventionFeedbackFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		const body = [bodyData]
		const token = globalContext.token

		apiInterventionFeedback
			.postNewInterventionFeedback(body, token)
			.then((response) => {
				setShowLoading(false)
				console.log(response.data.info)
				if (response.ok) {
					alert(`Thank you for filling the feedback form!`)
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
				inputs={InterventionFeedbackFormSpecifications}
				onSubmit={onSubmit}
			/>
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
})

const InterventionFeedbackFormSpecifications = [
	//part 1. Basic Details

	{
		name: 'email',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: abcd@gmail.com',
		question: '1. Basic details\n\n1.1) Enter your email address',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.email('Please enter a valid email ID.')
			.required('This field is required.'),
	},

	{
		name: 'intervention',
		type: 'picker',
		box: true,
		question: '1.2) Select the name of the intervention',
		options: [
			'Umang',
			'EXCEL',
			'GURU',
			'LEAD',
			'Parvarish',
			'SCD',
			'HR',
			'Accounts',
			'E&P',
			'Communication',
			'Health',
			'Nirmaan',
			'Volunteering',
			'TSEP',
			'Unnati',
			'COO Office',
			'DLS',
			'MIS',
			'Monitoring & Evaluation',
			'Research',
			'Any other',
		],
		style: styles.textinput,
		initial: 'Umang',
	},

	{
		name: 'poc_name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: '1.3) Enter the name of the POC (from Intervention)',
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

	{
		name: 'type_of_volunteer',
		type: 'picker',
		box: true,
		question: '1.4) Select the type of volunteer',
		options: ['Individual', 'Group'],
		style: styles.textinput,
		initial: 'Group',
	},

	{
		name: 'name_of_volunteer',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: '1.5) Enter the name of the Volunteer/Institute',
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

	{
		name: 'activities',
		type: 'multiple',
		box: true,
		question: '1.6) Activities performed',
		style: styles.textinput,
		initial: [
			{
				name: 'Mentoring (Life Skills, Substitute Teaching, Spoken English / Reading Session, Academic Teaching, Doubt Solving, etc.',
				state: false,
			},
			{
				name: 'Training / Workshop (Communication English, Train the Trainer, Counselling, Mock Interviews, etc.',
				state: false,
			},
			{
				name: 'Visits (Home, School, Community, and any other)',
				state: false,
			},
			{
				name: 'Content (Success Stories, Case Study, Translation Work, English Content, Digital Content, etc.)',
				state: false,
			},
			{
				name: 'Creative work (Photography, Videography, Designing, App Creation, etc.)',
				state: false,
			},
			{
				name: 'Knowledge Management (Data Entry, Data Analysis, Survey, Report Improvisation, Research, etc.)',
				state: false,
			},
			{
				name: 'Telephonic Spoken English Programme (TSEP)',
				state: false,
			},
			{
				name: 'DLS',
				state: false,
			},
			{
				name: 'MIS',
				state: false,
			},
			{
				name: 'Any other',
				state: false,
			},
		],
	},
	{
		name: 'duration',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Enter the date/s',
		question:
			'1.7) Enter the duration of activity.\n(if one-time activity, write the start date.\nif regular activity, write both the start and end date).',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},

	//part 2. Volunteering department
	{
		name: 'volunteers_sourced',
		type: 'picker',
		box: true,
		question:
			'2. Volunteering department\n\n2.1) How well were the volunteers sourced as per requisition?',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	{
		name: 'communication',
		type: 'picker',
		box: true,
		question: '2.2) How was the communication with Intervention/POC?',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	{
		name: 'coordination',
		type: 'picker',
		box: true,
		question: '2.3) How was the co-ordination/support?',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//part 3. POC Feedback on Volunteers
	{
		name: 'punctuality',
		type: 'picker',
		box: true,
		question:
			'3. POC Feedback on Volunteers\n\n3.1) Regularity & Punctuality',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},
	{
		name: 'grooming',
		type: 'picker',
		box: true,
		question: '3.2) Grooming',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},
	{
		name: 'professionalism',
		type: 'picker',
		box: true,
		question: '3.3) Professionalism',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},
	{
		name: 'skilled',
		type: 'picker',
		box: true,
		question: '3.4) Skilled',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},
	{
		name: 'understanding',
		type: 'picker',
		box: true,
		question: '3.5) Understanding/Connection with beneficiaries',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},
	{
		name: 'contribution',
		type: 'picker',
		box: true,
		question: '3.6) Overall contribution',
		options: ['Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	{
		name: 'highlight',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Please write in detail',
		question: '3.7) Highlight of the contribution/impact',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},

	{
		name: 'suggestion',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Please write in detail',
		question: '3.8) Any suggestions?',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},
]

export default InterventionFeedbackForm
