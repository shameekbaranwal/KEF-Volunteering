import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors.js'
import AppButton from '../components/AppButton.js'
import JoinUsBeneficiaryForm from '../components/Forms/JoinUsForms/JoinUsBeneficiaryForm.js'

const JoinUsBeneficiaryScreen = (props) => {
	return (
		<View style={styles.screen}>
			<AppButton
				title='Already a member? Login'
				styleButton={styles.loginScreenButton}
				styleText={styles.loginScreenButtonText}
				onPress={() => props.navigation.navigate('Login')}
			/>
			<JoinUsBeneficiaryForm
				returnToHome={() => props.navigation.navigate('Welcome')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
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

export default JoinUsBeneficiaryScreen
