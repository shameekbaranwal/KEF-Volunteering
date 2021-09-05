import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'
import helper from '../../../utilities.js'
import apiVolunteerFeedback from '../../../api/postNewVolunteerFeedback.js'
import AppContext from '../../AppContext.js'

const VolunteerFeedbackForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			VolunteerFeedbackFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		const body = [bodyData]
		const token = globalContext.token

		apiVolunteerFeedback
			.postNewVolunteerFeedback(body, token)
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
				inputs={VolunteerFeedbackFormSpecifications}
				onSubmit={onSubmit}
			/>
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
})

const VolunteerFeedbackFormSpecifications = [
	//part 1: Basic Details

	//name
	{
		name: 'name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question:
			'1. Basic Details\n\n1.1) Name of the Volunteer (Please enter your full name)',
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

	//name of intervention
	{
		name: 'intervention',
		type: 'picker',
		box: true,
		question:
			'1.2) Name of the intervention (Activity performed Intervention)',
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
			'DLS',
			'MIS',
			'Monitoring & Evaluation',
			'Research',
			'Any other',
		],
		style: styles.textinput,
		initial: 'GURU',
	},

	//Activities performed
	{
		name: 'activities',
		type: 'multiple',
		box: true,
		question: '1.3) Activities performed',
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

	//period of activity
	{
		name: 'period_of_activity',
		type: 'picker',
		box: true,
		question: '1.4) Period of activity',
		options: ['One time', 'Regular'],
		style: styles.textinput,
		initial: 'Regular',
	},

	//date of activity (only for one-time)
	{
		name: 'onetime_date',
		type: 'date',
		box: true,
		initial: new Date(),
		question:
			'1.5) If you picked "One Time" above, select the date of the activity.',
	},

	//start date of activity (only for regular)
	{
		name: 'regular_startdate',
		type: 'date',
		box: true,
		initial: new Date(),
		question:
			'1.6) If you picked "Regular" above, select the start date of the activity.',
	},

	//end date of activity (only for regular)
	{
		name: 'regular_enddate',
		type: 'date',
		box: true,
		initial: new Date(),
		question:
			'1.7) If you picked "Regular" above, select the end date of the activity.',
	},

	//part 2: Orientation details

	//rate orientation about KEF
	{
		name: 'orientation_about_KEF',
		type: 'picker',
		box: true,
		question:
			'2. Orientation\n\n2.1) How was the orientation about KEF Programme?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//rate volunteering opportunity explanation
	{
		name: 'volunteering_opportunity',
		type: 'picker',
		box: true,
		question: '2.2) How well was the volunteering opportunity explained?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//rate volunteering process explanation
	{
		name: 'volunteering_process',
		type: 'picker',
		box: true,
		question: '2.3) How well was the volunteering process explained?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//rate roles and responsibilities explanation
	{
		name: 'roles',
		type: 'picker',
		box: true,
		question:
			'2.4) How well were the roles and responsibilities clarified and shared?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//part 3. logistics arrangement

	//rate session material
	{
		name: 'session_material',
		type: 'picker',
		box: true,
		question:
			'3. Logistics Arrangement\n\n3.1) What did you think about the session material provided for the session?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//rate punctuality on session
	{
		name: 'punctuality',
		type: 'picker',
		box: true,
		question: '3.2) How was the punctuality on the session?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//rate punctuality on session
	{
		name: 'supervision',
		type: 'picker',
		box: true,
		question: '3.3) How was the onsite supervision and guidance?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//part 4. Communication

	//updates
	{
		name: 'updates',
		type: 'picker',
		box: true,
		question: '4. Communication\n\n4.1) Updates on session?',
		options: ['Yes', 'No'],
		style: styles.textinput,
		initial: 'Yes',
	},

	//reporting
	{
		name: 'reporting',
		type: 'picker',
		box: true,
		question: '4.2) Reporting (Attendance, Feedback, Issues)',
		options: ['Yes', 'No'],
		style: styles.textinput,
		initial: 'Yes',
	},

	//part 5. feedback about beneficiaries

	//beneficiaries response
	{
		name: 'beneficiaries_response',
		type: 'picker',
		box: true,
		question:
			'5. Feedback about beneficiaries\n\n5.1) How is the response from the beneficiaries?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//beneficiaries punctuality
	{
		name: 'beneficiaries_punctuality',
		type: 'picker',
		box: true,
		question: '5.2) How is the punctuality of the beneficiaries?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//beneficiaries participation
	{
		name: 'beneficiaries_participation',
		type: 'picker',
		box: true,
		question: '5.3) How is the participation of the beneficiaries?',
		options: ['Poor', 'Fair', 'Average', 'Very Good', 'Excellent'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//beneficiaries participation
	{
		name: 'learning_outcome',
		type: 'picker',
		box: true,
		question: '5.4) How has the learning outcome been?',
		options: ['Outstanding', 'Very Good', 'Good', 'Did not understand'],
		style: styles.textinput,
		initial: 'Very Good',
	},

	//comments
	{
		name: 'comments',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Please write in detail',
		question: '5.5) Comments and suggestions',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},

	//experience
	{
		name: 'experience',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Write in 50-70 words',
		question: '5.6) Share your experience',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},
]

export default VolunteerFeedbackForm
