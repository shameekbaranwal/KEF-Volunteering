import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'
import helper from '../../../utilities.js'
import apiLogSheet from '../../../api/postNewLog.js'
import AppContext from '../../AppContext.js'

const LogSheetForm = (props) => {
	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	const [showLoading, setShowLoading] = useState(false)

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			LogSheetFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		//Adding month in column[2]
		bodyData.splice(2, 0, helper.months[values.date_of_service.getMonth()])
		//Adding hours worked in last column
		bodyData.push(
			helper.getHoursDiff(values.in_time, values.out_time) + ' hours',
		)

		const body = [bodyData]
		const token = globalContext.token

		apiLogSheet
			.postNewLog(body, token)
			.then((response) => {
				setShowLoading(false)
				console.log(response.data.info)
				if (response.ok) {
					alert(
						`Thank you for filling the log sheet for ${values.date_of_service.toDateString()}, ${
							values.name
						}`,
					)
					// props.returnToHome() //commented this out because a user might want to fill logs for multiple days in one go.
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
			<AppForm inputs={LogSheetFormSpecifications} onSubmit={onSubmit} />
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
})

const inTimeDefault = new Date()
inTimeDefault.setHours(8)
inTimeDefault.setMinutes(0)

const outTimeDefault = new Date()
outTimeDefault.setHours(18)
outTimeDefault.setMinutes(0)

const LogSheetFormSpecifications = [
	{
		name: 'name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question: 'Name of the Volunteer (Please type your full name)',
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

	//Date of service
	{
		name: 'date_of_service',
		type: 'date',
		box: true,
		initial: new Date(),
		max: new Date(),
		question: 'Select the date of service',
	},

	//In time
	{
		name: 'in_time',
		type: 'time',
		box: true,
		initial: inTimeDefault,
		question: 'Enter your in-time',
	},

	//Out time
	{
		name: 'out_time',
		type: 'time',
		box: true,
		initial: outTimeDefault,
		question: 'Enter your out-time',
	},

	{
		name: 'category_of_volunteers',
		type: 'picker',
		box: true,
		question: 'Select the category of volunteers you belong to',
		options: ['Student', 'Skilled', 'Professional', 'KEF Staff'],
		style: styles.textinput,
		initial: 'Student',
	},

	{
		name: 'name_of_institute',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: "If you're an Individual, type Individual",
		question:
			'Enter the name of the College/Institute/Management Institute/Corporate/NGO',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},

	{
		name: 'places_of_work',
		type: 'multiple',
		box: true,
		question: 'Please select your places of work',
		style: styles.textinput,
		initial: [
			{ name: 'HO', state: false },
			{ name: 'KEF Partner School', state: false },
			{ name: 'Unnati Center', state: false },
			{ name: 'Work from home', state: false },
			{ name: 'Any other', state: false },
		],
	},
	{
		name: 'name_of_intervention',
		type: 'multiple',
		box: true,
		question: 'Select the name/s of the intervention.',
		style: styles.textinput,
		initial: [
			{ name: 'Unnati', state: false },
			{ name: 'Umang', state: false },
			{ name: 'EXCEL', state: false },
			{ name: 'LEAD', state: false },
			{ name: 'Parvarish', state: false },
			{ name: 'Health', state: false },
			{ name: 'SCD', state: false },
			{ name: 'Communication', state: false },
			{ name: 'E&P', state: false },
			{ name: 'CEO Office', state: false },
			{ name: 'Volunteering', state: false },
			{ name: 'NIRMAAN', state: false },
			{ name: 'HR', state: false },
			{ name: 'Accounts', state: false },
			{ name: 'Research', state: false },
			{ name: 'GURU', state: false },
			{ name: 'MIS', state: false },
			{ name: 'DLS', state: false },
			{ name: 'Monitoring & Evaluation', state: false },
			{ name: 'Any other', state: false },
		],
	},

	{
		name: 'main_activity',
		type: 'picker',
		box: true,
		question: 'Main activity',
		options: [
			'Telephonic Spoken English Programme (TSEP)',
			'Mentoring',
			'Internship',
			'Intervention based',
		],
		style: styles.textinput,
		initial: 'Telephonic Spoken English Programme (TSEP)',
	},

	{
		name: 'type_of_activity',
		type: 'multiple',
		box: true,
		question: 'Select the type/s of activities performed',
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
				name: 'Knowledge Management (Data Entry, Data Analysis, Survey, Report Improvisation,Research, etc)',
				state: false,
			},
			{
				name: 'Telephonic Spoken English Programme (TSEP)',
				state: false,
			},
			{
				name: 'MIS',
				state: false,
			},
			{
				name: 'DLS',
				state: false,
			},
			{
				name: 'Any other',
				state: false,
			},
		],
	},

	{
		name: 'details_of_activities',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: "eg: Worked on the application's interface",
		question:
			'Kindly write all the details of the activities that you performed during the day',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},

	{
		name: 'challenges_faced',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: Found the assignment difficult',
		question: 'Please mention if any challenges faced',
		style: styles.textinput,
		initial: '',
		validation: Yup.string(),
	},

	{
		name: 'poc_volunteering',
		type: 'picker',
		box: true,
		question: 'POC from Volunteering Department',
		options: [
			'Nisha Dixit',
			'Sucheta Rege',
			'Sneha Dolas',
			'Salonee Raj',
			'Prachi Masavkar',
			'Ajit Maskar',
			'Thomas Adaikalam',
		],
		style: styles.textinput,
		initial: 'Nisha Dixit',
	},

	{
		name: 'poc_intervention',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Please enter the full name',
		question: 'POC from Intervention',
		style: styles.textinput,
		initial: '',
	},
]

export default LogSheetForm
