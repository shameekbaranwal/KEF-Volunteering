import React, { useState, useRef } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Colors from '../../../constants/Colors.js'
import AppTextInput from './AppTextInput.js'

export default function AppPicker({
	options,
	question,
	defaultValue,
	box,
	value,
	onValueChange,
	error,
	touched,
}) {
	const styles = StyleSheet.create({
		container: {
			marginVertical: '2%',
			width: '90%',
			borderRadius: box ? 30 : 0,
			padding: box ? '5%' : 0,
			backgroundColor: box ? Colors.white : null,
			elevation: box ? 3 : 0,
		},
		question: {
			color: Colors.dark,
			marginLeft: '5%',
			fontSize: 18,
			fontWeight: 'bold',
		},
		pickr: {
			backgroundColor: Colors.light,
			marginTop: '2%',
			borderRadius: 20,
			elevation: box ? 3 : 0,
		},
		error: {
			alignSelf: 'center',
			fontSize: 14,
			marginTop: box ? '2%' : '-1.5%',
			marginBottom: '-3%',
			color: 'red',
			backgroundColor: box ? Colors.white : Colors.light,
			borderRadius: 5,
			paddingHorizontal: '2%',
		},
	})

	return (
		<View style={styles.container}>
			{question && <Text style={styles.question}>{question}</Text>}
			<TouchableOpacity style={styles.pickr}>
				<Picker
					selectedValue={value}
					onValueChange={onValueChange}
					mode='dropdown'
				>
					<Picker.Item
						value={''}
						label='Not Selected'
						key={'Not Selected'}
					/>
					{options.map((option, index) => {
						return (
							<Picker.Item
								value={option}
								label={option}
								key={option}
							/>
						)
					})}
				</Picker>
			</TouchableOpacity>
			{error && touched && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}
