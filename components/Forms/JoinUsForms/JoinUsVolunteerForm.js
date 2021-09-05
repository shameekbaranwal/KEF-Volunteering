import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../AppForm.js'
import apiVolunteers from '../../../api/registerNewVolunteer.js'
import helper from '../../../utilities.js'
import Colors from '../../../constants/Colors.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'

const JoinUsVolunteerForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []
		bodyData.push(new Date().toLocaleString())

		bodyData = helper.getBodyDataArray(
			JoinUsFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		//commenting out this because now that field is removed in the updated sheet.
		// bodyData.splice(2, 0, '') //for the image link cause we don't have that.

		const body = [bodyData]

		apiVolunteers
			.postNewVolunteer(body)
			.then((response) => {
				setShowLoading(false)
				console.log(response.data.info)
				if (response.ok) {
					alert(`Thank you for filling the form, ${values.name}`)
					props.returnToHome()
				} else {
					alert(
						`There was an error in submitting the form. Please try again.`,
					)
				}
			})
			.catch((error) => {
				alert(
					`There was an error in submitting the form. Please try again.`,
				)
			})
	}

	return (
		<>
			<AppForm inputs={JoinUsFormSpecifications} onSubmit={onSubmit} />
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

const JoinUsFormSpecifications = [
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
		name: 'age',
		type: 'picker',
		box: true,
		question: 'Select your age',
		options: ['<19', '19 to 29', '30 to 39', '40 to 49', '50 to 59', '>59'],
		style: styles.textinput,
		initial: '19 to 29',
	},
	{
		name: 'address',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Enter full address including zipcode',
		question: 'Enter your address',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.min(5, 'Please enter your full address.')
			.required('This field is required.'),
	},
	{
		name: 'phone',
		type: 'text',
		box: true,
		keyboardType: 'numeric',
		question: 'Enter your phone number',
		placeholder: 'eg:9876543210',
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
		name: 'educational_qualification',
		type: 'picker',
		box: true,
		question: 'Select your educational qualification',
		options: [
			'Higher Secondary',
			'Undergraduate',
			'Graduate',
			'Post Graduate',
			'Doctorate',
			'Vocational Educational Qualification',
			'Other',
		],
		style: styles.textinput,
		initial: 'Higher Secondary',
	},
	{
		name: 'current_profession',
		type: 'picker',
		box: true,
		question: 'Select your current profession',
		options: ['Professional', 'Skilled', 'KEF Staff', 'Student'],
		style: styles.textinput,
		initial: 'Professional',
	},
	{
		name: 'category_of_student_volunteer',
		type: 'picker',
		box: true,
		question:
			'If you selected "Student" above,\nselect the category applicable',
		options: [
			'Not a student, so not applicable',
			'Management (Post Graduate)',
			'Social worker',
			'NSS',
			'B.Ed / D.Ed',
			'DLLE',
			'ISR/DSR',
			'International school',
			'Professional courses',
			'Other',
		],
		style: styles.textinput,
		initial: 'Not a student, so not applicable',
	},
	{
		name: 'sources_of_volunteers',
		type: 'picker',
		box: true,
		question: 'Sources of Volunteers',
		options: ['Individual', 'Institute', 'Corporate'],
		style: styles.textinput,
		initial: 'Individual',
	},
	{
		name: 'organization_name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'if individual, fill N/A',
		question:
			'If you selected Institute or Corporate above, enter its name',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required(
			'Please enter the name of your source Institute/Corporation. Fill N/A if Individual.',
		),
	},

	//Preferable areas of work
	{
		name: 'preferred_work',
		type: 'multiple',
		box: true,
		question: 'Select your preferred areas of work.',
		style: styles.textinput,
		initial: [
			{ name: 'KEF Office', state: false },
			{ name: 'Field (School/Community)', state: false },
			{
				name: 'Unnati Center (Deonar, Mulund, Sion, Mahim, Andheri, Goregaon, Virar)',
				state: false,
			},
			{ name: 'Work from home', state: false },
		],
	},
	{
		name: 'duration',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'Enter a duration, eg: 2 weeks',
		question: 'How long can you volunteer with KEF?',
		style: styles.textinput,
		initial: '',
		validation: Yup.string().required('This field is required.'),
	},
	{
		name: 'declaration',
		type: 'picker',
		box: true,
		question:
			'Declaration:\nI, hereby declare that the above statements are true. This is my commitment to serve as an active volunteer with Kotak Education Foundation. I shall pursue to promote KEF’s endeavors and never do anything that will damage its values or vision.',
		options: ['Agree'],
		style: styles.textinput,
		initial: 'Agree',
	},
]

export default JoinUsVolunteerForm
