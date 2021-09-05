import React from 'react'
import { Text, View } from 'react-native'

import AppPicker from './AppPicker.js'
import AppMultipleInput from './AppMultipleInput.js'
import AppTextInput from './AppTextInput.js'
import AppDatePicker from './AppDatePicker.js'
import AppTimePicker from './AppTimePicker.js'

export default function AppFormField({
	inputData,
	value,
	onValueChange,
	name,
	setFieldValue,
	touched,
	setFieldTouched,
	error,
}) {
	if (inputData.type === 'text')
		return (
			<AppTextInput
				key={inputData.name}
				placeholder={inputData.placeholder}
				question={inputData.question}
				keyboardType={inputData.keyboardType}
				box={inputData.box}
				value={value}
				onValueChange={onValueChange}
				error={error}
				touched={touched}
				onBlur={setFieldTouched}
				setFieldTouched={setFieldTouched}
				name={name}
			/>
		)
	if (inputData.type === 'picker')
		return (
			<AppPicker
				key={inputData.name}
				options={inputData.options}
				question={inputData.question}
				box={inputData.box}
				defaultValue={inputData.initial || inputData.options[0]}
				value={value}
				onValueChange={onValueChange}
				//following props for error
				error={error}
				touched={touched}
			/>
		)
	if (inputData.type === 'multiple') {
		return (
			<AppMultipleInput
				key={inputData.name}
				question={inputData.question}
				box={inputData.box}
				initial={inputData.initial}
				value={value}
				onValueChange={onValueChange}
				// the onValueChange method for some reason does not work with booleans somehow, so I'm using the next two variabales based on the solution given at https://bit.ly/2TVFQwC
				name={name}
				setFieldValue={setFieldValue}
			/>
		)
	}
	if (inputData.type === 'date') {
		return (
			<AppDatePicker
				key={inputData.name}
				testID={inputData.name}
				name={inputData.name}
				question={inputData.question}
				initial={inputData.initial}
				value={value}
				onChange={onValueChange}
				max={inputData.max || new Date(2030, 1, 1)}
				min={inputData.min || new Date(2019, 1, 1)}
				// setFieldValue={(value) => setFieldValue(name, value)}
				setFieldValue={setFieldValue}
			/>
		)
	}
	if (inputData.type === 'time') {
		return (
			<AppTimePicker
				key={inputData.name}
				testID={inputData.name}
				name={inputData.name}
				question={inputData.question}
				initial={inputData.initial}
				value={value}
				// onChange={onValueChange}
				// setFieldValue={(value) => setFieldValue(name, value)}
				setFieldValue={setFieldValue}
			/>
		)
	}

	return <Text>Invalid</Text>
}
