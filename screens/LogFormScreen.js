import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import LogSheetForm from '../components/Forms/LogSheetForm/LogSheetForm.js'
import Colors from '../constants/Colors.js'

const LogFormScreen = (props) => {
	return (
		<View style={styles.screen}>
			<LogSheetForm
				returnToHome={() => props.navigation.navigate('AfterLogin')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		// justifyContent: 'center',
		marginBottom: '-10%',
	},
})

export default LogFormScreen
