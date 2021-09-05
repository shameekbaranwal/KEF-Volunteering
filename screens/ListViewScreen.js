import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AppListView from '../components/ActivitySchedule/AppListView.js'
import AppTextInput from '../components/Forms/InputFields/AppTextInput.js'
import Colors from '../constants/Colors.js'
import AppContext from '../components/AppContext' //Import this.
import useBackButton from '../components/BackButtonHandler.js'
import { scale } from 'react-native-size-matters'

const ListViewScreen = (props) => {
	const globalContext = useContext(AppContext)

	const [eventDetails, setEventDetails] = useState([])
	const [searchText, setSearchText] = useState('')
	const [fullEventsList, setFullEventsList] = useState(
		globalContext.eventsList,
	)

	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = () => {
		setRefreshing(true)
		globalContext
			.eventGetter(globalContext.token)
			.then((arr) => {
				setFullEventsList(arr)
				setSearchDetails('')
				setRefreshing(false)
			})
			.catch((e) => {
				console.error(
					'Error in refreshing events on the List View Screen:\n' + e,
				)
			})
	}

	const setSearchDetails = (text) => {
		setSearchText(text)

		text = typeof text === 'string' ? text.toLowerCase() : ''
		let newEvents = []

		if (text !== '') {
			newEvents = [...fullEventsList]
			newEvents = newEvents.filter(
				(eve) =>
					eve.activity_name.toLowerCase().includes(text) ||
					eve.volunteer_teacher.toLowerCase().includes(text) ||
					eve.kef_member_incharge.toLowerCase().includes(text) ||
					eve.details.toLowerCase().includes(text),
			)
		}
		setEventDetails(newEvents)
	}

	useBackButton(() => {
		props.navigation.navigate('AfterLogin')
		return true
	})

	return (
		<View style={styles.container}>
			<AppTextInput
				placeholder={'Search activities'}
				box={false}
				keyboardType={'default'}
				size={'80%'}
				value={searchText}
				onChangeText={setSearchDetails}
			/>
			{searchText === '' && (
				<Text style={styles.info}>
					{`Type in the search box to find matching activities.\n\nYou can search by:\n\tActivity Name,\n\tDetails, \n\tVolunteer, \n\tor KEF Member in-charge.`}
				</Text>
			)}
			<AppListView
				eventDetails={eventDetails}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	info: {
		color: Colors.white,
		fontSize: scale(14),
		position: 'relative',
		top: '20%',
	},
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: Colors.primary,
		alignItems: 'center',
		paddingBottom: '25%',
	},
})

export default ListViewScreen
