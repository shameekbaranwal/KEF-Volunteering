import React, { useState, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'
import * as Yup from 'yup'
import * as SMS from 'expo-sms'

import AppForm from '../AppForm.js'
import CustomActivityIndicator from '../../CustomActivityIndicator.js'
import helper from '../../../utilities.js'
import apiEvents from '../../../api/scheduleNewEvent.js'
import AppContext from '../../AppContext.js' //Import this.

const ScheduleEventForm = (props) => {
	const [showLoading, setShowLoading] = useState(false)

	const globalContext = useContext(AppContext) //for updating calendar when new event is created

	const onSubmit = (values) => {
		setShowLoading(true)

		let bodyData = []

		bodyData = helper.getBodyDataArray(
			ScheduleEventFormSpecifications,
			values,
			bodyData,
		)

		// bodyData.splice( index, 0, item ); // to add an 'item' and 'index' by pushing everything ahead

		//Appending the correct date-time object at the end for the Notifications
		const date = values.date
		const time = values.time
		date.setHours(time.getHours())
		date.setMinutes(time.getMinutes())
		bodyData.push(date.getTime())

		//Making sure the date at column 3 (index 2) is readable by the app when accessed
		bodyData[2] = helper.convertDateLogs(values.date)

		const body = [bodyData]
		const token = globalContext.token

		apiEvents
			.scheduleNewEvent(body, token)
			.then((response) => {
				globalContext
					.eventGetter(globalContext.token)
					.then(() => {
						setShowLoading(false)
						console.log(response.data.info)
						if (response.ok) {
							// alert(
							// 	`Thank you for filling the form!\nYour event ${values.activity_name} has been created. You can now view it on the Calendar.`,
							// )
							Alert.alert(
								'',
								`Your activity "${values.activity_name}" has been scheduled. You can now view it on the Calendar. You can send a message to the Volunteer in-charge about the event.`,
								[
									{
										text: 'Return',
										onPress: () => null,
										style: 'cancel',
									},
									{
										text: 'Send SMS to Volunteer',
										onPress: () => {
											SMS.isAvailableAsync().then(
												(isAvailable) => {
													if (isAvailable) {
														SMS.sendSMSAsync(
															[
																`${values.volunteer_phone_no}`,
															],
															`Hello, ${
																values.volunteer_teacher
															}.\nThis message is to invite you to the activity "${
																values.activity_name
															}" scheduled on ${helper.convertDate(
																values.date,
															)} at ${helper.convertTime(
																values.time,
															)} by Kotak Education Foundation.\nThe KEF Member in-charge of this activity is ${
																values.kef_member_incharge
															}, and you can contact them at ${
																values.kef_team_phone_no
															} in case of any discrepancy.\nYou can view more details about the activity in our android app under the Activity Schedule.\n\nThank you for being a part of Kotak Education Foundation.`,
														)
													}
												},
											)
										},
									},
								],
							)
							props.returnToHome()
						} else
							alert(
								`There was an error in submitting the form. Please try again.`,
							)
					})
					.catch((e) => console.error(e))
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
				inputs={ScheduleEventFormSpecifications}
				onSubmit={onSubmit}
			/>
			<CustomActivityIndicator show={showLoading} />
		</>
	)
}

const styles = StyleSheet.create({
	textinput: {},
})

const init = new Date()

const ScheduleEventFormSpecifications = [
	{
		name: 'activity_name',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: English class',
		question: 'Enter the name of the activity',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.min(3, 'Please enter a longer name.')
			.required('This field is required.'),
	},
	{
		name: 'session',
		type: 'text',
		box: true,
		keyboardType: 'numeric',
		placeholder: 'eg: 3',
		question: 'Enter the session number of this activity',
		style: styles.textinput,
		initial: '',
		validation: Yup.number('Needs to be a number')
			.moreThan(0, 'Invalid session number')
			.required('Please enter a session number'),
	},
	{
		name: 'date',
		type: 'date',
		box: true,
		initial: init,
		min: init,
		question: 'Select a date for the session',
	},
	{
		name: 'time',
		type: 'time',
		box: true,
		initial: init,
		question: 'Select a time for the session',
	},
	{
		name: 'duration',
		type: 'picker',
		box: true,
		question: 'Select the duration of the event',
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
	{
		name: 'volunteer_teacher',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question:
			'Enter the name of the volunteer that will be conducting this activity session',
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
		name: 'kef_member_incharge',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: John Doe',
		question:
			'Enter the name of the KEF Member in-charge for this activity session',
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
		name: 'volunteer_phone_no',
		type: 'text',
		box: true,
		keyboardType: 'numeric',
		question: 'Enter the contact number of the volunteer in-charge',
		placeholder: 'eg: 9876543210',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.length(10, 'Please enter a valid 10-digit phone number.')
			.required('This field is required.'),
	},
	{
		name: 'kef_team_phone_no',
		type: 'text',
		box: true,
		keyboardType: 'numeric',
		question: 'Enter the contact number of the KEF Member in-charge',
		placeholder: 'eg: 9876543210',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.length(10, 'Please enter a valid 10-digit phone number.')
			.required('This field is required.'),
	},
	{
		name: 'details',
		type: 'text',
		box: true,
		keyboardType: 'default',
		placeholder: 'eg: Vocal English skills will be practiced.',
		question: 'Enter details about the activity.',
		style: styles.textinput,
		initial: '',
		validation: Yup.string()
			.min(3, 'Please enter more details.')
			.max(30, 'Please enter a shorter description.')
			.required('This field is required.'),
	},
]

export default ScheduleEventForm
