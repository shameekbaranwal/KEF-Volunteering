import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Card from './ActivityCard.js'
import Colors from '../../constants/Colors.js'
import helper from '../../utilities.js'
import { scale, verticalScale } from 'react-native-size-matters'

const ListView = (props) => {
	const item = props.itemData
	// const date = new Date(item.date)

	const date = new Date(parseInt(item.milliseconds, 10))

	return (
		<TouchableOpacity
			style={styles.screen}
			onPress={() => props.onCardPress(item)}
		>
			<View>
				<Card style={styles.cardContainer}>
					<View style={styles.titleAndName}>
						<Text style={styles.activityTitle}>
							{item.activity_name}
						</Text>
						<Text style={styles.name}>
							{item.volunteer_teacher}
						</Text>
					</View>
					<View style={styles.activityDescription}>
						<Text style={{ ...styles.txt }}>
							{helper.convertDate(date)}
						</Text>
						<Text style={{ ...styles.txt }}>
							{helper.convertTime(date)}
						</Text>
					</View>
				</Card>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	screen: {
		marginTop: '3%',
	},
	cardContainer: {
		padding: '4%',
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: '20%',
		backgroundColor: Colors.light,
	},
	name: {
		fontSize: scale(16),
		color: Colors.secondary,
	},
	titleAndName: {
		width: '60%',
		alignItems: 'center',
		marginVertical: verticalScale(2),
	},
	activityTitle: {
		alignSelf: 'center',
		fontSize: scale(20),
		fontWeight: 'bold',
		color: Colors.secondary,
	},
	activityDescription: {
		width: '40%',
		flexDirection: 'column',
		alignItems: 'flex-start', // if you want to fill rows left to right
		alignItems: 'center',
	},
	txt: {
		fontSize: scale(15),
		color: Colors.dark,
	},
})

export default ListView
