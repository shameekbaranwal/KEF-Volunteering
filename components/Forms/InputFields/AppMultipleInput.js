import React, { useState } from 'react'
import { Text, View, StyleSheet, Switch } from 'react-native'

import Colors from '../../../constants/Colors.js'
import AppSwitch from './AppSwitch.js'

export default function AppMultipleInput({
	box,
	question,
	value,
	name,
	setFieldValue,
}) {
	const styles = StyleSheet.create({
		container: {
			marginVertical: 10,
			width: '90%',
			borderRadius: box ? 30 : 0,
			padding: box ? 20 : 0,
			backgroundColor: box ? Colors.white : null,
			elevation: box ? 3 : 0,
		},
		question: {
			color: Colors.dark,
			marginLeft: 15,
			marginBottom: 15,
			fontSize: 18,
			fontWeight: 'bold',
		},
	})

	return (
		<View style={styles.container}>
			<Text style={styles.question}>{question}</Text>
			{value.map((v, index) => (
				<AppSwitch
					name={v.name}
					key={v.name}
					value={v.state}
					onValueChange={(flag) => {
						let newSelected = [...value]
						newSelected[index].state = flag
						// onValueChange(newSelected)

						//Method from https://bit.ly/2TVFQwC
						setFieldValue(name, newSelected)
					}}
				/>
			))}
		</View>
	)
}
