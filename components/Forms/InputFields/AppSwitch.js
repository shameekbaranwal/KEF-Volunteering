import React from 'react'
import { View, TouchableOpacity, Text, Switch, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors.js'

export default function AppSwitch({ value, name, onValueChange }) {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				onValueChange(!value)
			}}
		>
			<Text style={styles.text}>{name}</Text>
			<Switch
				style={styles.switch}
				value={value}
				onValueChange={onValueChange}
				thumbColor={Colors.lightblue}
				trackColor={{ true: Colors.lighterblue, false: Colors.grey }}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light,
		flex: 1,
		padding: '5%',
		flexDirection: 'row',
		// borderWidth: 1,
		elevation: 3,
		borderRadius: 20,
		marginVertical: '2%',
	},
	text: {
		width: '80%',
	},
	switch: {
		width: '20%',
	},
})
