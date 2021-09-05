import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native'
import ActivityModal from './ActivityModal.js'
import ListView from './ListView.js'
import Colors from '../../constants/Colors.js'

export default function AppListView({ eventDetails, refreshing, onRefresh }) {
	const [visible, setVisible] = useState(false)
	const [currentEvent, setCurrentEvent] = useState({})

	const renderActivities = (itemData) => {
		return <ListView itemData={itemData.item} onCardPress={onCardPress} />
	}

	const onCardPress = (currEve) => {
		setCurrentEvent(currEve)
		setVisible(true)
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Colors.primary,
			}}
		>
			<ActivityModal
				visible={visible}
				onCrossPress={() => setVisible(false)}
				currentEvent={currentEvent}
			/>
			<FlatList
				style={{ flex: 1 }}
				data={eventDetails}
				renderItem={renderActivities}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				keyExtractor={(item, index) => item.row_id.toString()}
				// maxToRenderPerBatch={6}
				// updateCellsBatchingPeriod={200}
				initialNumToRender={100}
			/>
		</View>
	)
}
