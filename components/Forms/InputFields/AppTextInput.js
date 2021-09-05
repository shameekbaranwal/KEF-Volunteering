/*
This is a reuseable component. This essentially extends the React Native <TextInput/> component with a bunch of generalized styles that will be used throughout the app.
It will be called within AppForm component, which will reuse it based on the arguments provided to that AppForm.
The general syntax would be this:
<AppTextInput
	placeholder={input.placeholder}
	style={styles.textinput}
	key={input.placeholder}
	keyboardType={input.keyboardType}
/>

*/

import React from 'react'
import { useRef, useState } from 'react'
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'

import Colors from '../../../constants/Colors.js'

export default function AppTextInput({
	question,
	textColor = Colors.dark,
	keyboardType = 'default',
	box,
	size = '90%',
	onValueChange,
	error,
	name,
	onBlur,
	touched,
	setFieldTouched = () => {},
	...otherProps
}) {
	const [height, setHeight] = useState('auto')

	const styles = StyleSheet.create({
		container: {
			marginVertical: '2%',
			width: size,
			borderRadius: box ? 30 : 0,
			padding: box ? '5%' : 0,
			// paddingBottom: error && box ? 20 : 0,
			backgroundColor: box ? Colors.white : null,
			elevation: box ? 3 : 0,
		},
		inputBox: {
			backgroundColor: Colors.light,
			borderRadius: 25,
			paddingHorizontal: '5%',
			paddingVertical: box ? '5%' : '7%',
			alignItems: 'center',
			elevation: box ? 3 : 0,
		},
		text: {
			fontSize: box ? 14 : 16,
			color: Colors.dark,
			width: '100%',
			fontFamily: 'sans-serif',
			height: height,
		},
		question: {
			color: Colors.dark,
			marginLeft: '5%',
			marginBottom: '3%',
			fontSize: 18,
			fontWeight: 'bold',
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

	//these two variables and the ref prop in TextInput is to make it so that clicking on the box outside the TextInput can also bring the TextInput into focus.
	const txtinput = useRef(null)
	const focusTextInput = () => {
		txtinput.current.focus()
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				focusTextInput()
				setFieldTouched()
			}}
		>
			{question && <Text style={styles.question}>{question}</Text>}
			<View style={styles.inputBox}>
				<TextInput
					style={styles.text}
					keyboardType={keyboardType}
					ref={txtinput}
					onChangeText={onValueChange}
					onBlur={onBlur}
					multiline
					onContentSizeChange={(e) => {
						setHeight(e.nativeEvent.contentSize.height)
					}}
					{...otherProps}
				/>
			</View>
			{/* error will be outside the textinput field and inside the box if a box exists */}
			{error && touched && <Text style={styles.error}>{error}</Text>}
		</TouchableOpacity>
	)
}
