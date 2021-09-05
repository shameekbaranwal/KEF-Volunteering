import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import CalendarComponent from '../components/ActivitySchedule/CalendarComponent'
import AppContext from '../components/AppContext' //Import this.

const CalendarViewScreen = ({ navigation }) => {
	const globalContext = useContext(AppContext) //This creates a local object "globalContext" that can change value of variables in "AppContext "
	const [eventsScheduled, setEventsScheduled] = useState(
		globalContext.eventsList,
	)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = () => {
		setRefreshing(true)
		globalContext
			.eventGetter(globalContext.token)
			.then((arr) => {
				setEventsScheduled(arr)
				setRefreshing(false)
			})
			.catch((e) =>
				console.error(
					'Error in refreshing the events on Calendar View Screen:\n' +
						e,
				),
			)
	}

	return (
		<View style={styles.screen}>
			<CalendarComponent
				navigation={navigation}
				EventsScheduled={eventsScheduled}
				//for managing pull to refresh
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#fff',
		flex: 1,
	},
})

export default CalendarViewScreen
