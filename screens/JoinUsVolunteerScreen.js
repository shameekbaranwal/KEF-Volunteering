import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors.js'
import AppButton from '../components/AppButton.js'
import JoinUsVolunteerForm from '../components/Forms/JoinUsForms/JoinUsVolunteerForm.js'

const JoinUsVolunteerScreen = (props) => {
	return (
		<View style={styles.screen}>
			<AppButton
				title='Already a member? Login'
				styleButton={styles.loginScreenButton}
				styleText={styles.loginScreenButtonText}
				onPress={() => props.navigation.navigate('Login')}
			/>
			<JoinUsVolunteerForm
				returnToHome={() => props.navigation.navigate('Welcome')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// backgroundColor: Colors.light,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textinput: {},
	loginScreenButton: {
		backgroundColor: Colors.secondary,
		width: 'auto',
		height: 'auto',
		paddingHorizontal: '3%',
		paddingVertical: '1%',
		marginTop: '15%',
		borderRadius: 7,
	},
	loginScreenButtonText: {
		fontWeight: 'bold',
		color: Colors.white,
	},
})

export default JoinUsVolunteerScreen
