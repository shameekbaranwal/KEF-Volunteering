import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../../constants/Colors.js'
import helper from '../../../utilities.js'

export default function AppDatePicker({
	value,
	question,
	testID,
	name,
	max,
	min,
	setFieldValue,
}) {
	const [show, setShow] = useState(false)
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => setShow(true)}
		>
			<View style={styles.questionContainer}>
				<Text style={styles.question}>{question}</Text>
				<Ionicons
					name='chevron-down-circle'
					size={24}
					color={Colors.primary}
				/>
			</View>
			<View style={styles.inputBox}>
				<Text style={styles.value}>
					{helper.convertDate(value, true)}
				</Text>
			</View>
			{show && (
				<DateTimePicker
					testID={testID}
					value={value}
					mode={'date'}
					is24Hour={true}
					display='default'
					maximumDate={max}
					minimumDate={min}
					onChange={(event, selectedDate) => {
						setShow(false)
						setFieldValue(name, selectedDate || value)
					}}
				/>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: '2%',
		width: '90%',
		borderRadius: 30,
		padding: '5%',
		backgroundColor: Colors.white,
		elevation: 3,
	},
	questionContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	inputBox: {
		backgroundColor: Colors.light,
		borderRadius: 25,
		flexDirection: 'row',
		marginTop: '5%',
		justifyContent: 'center',
		// padding: '5%',/
		paddingHorizontal: '5%',
		paddingVertical: '6%',
		elevation: 3,
	},
	icon: {},
	question: {
		color: Colors.dark,
		fontSize: 18,
		fontWeight: 'bold',
		marginHorizontal: '5%',
	},
	value: {
		color: Colors.dark,
		// marginLeft: '10%',
		alignSelf: 'center',
		fontSize: 18,
		// fontWeight: 'bold',
	},
})
