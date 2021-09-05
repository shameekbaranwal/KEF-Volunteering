import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors.js'
import BeneficiaryFeedbackForm from '../components/Forms/FeedbackForms/BeneficiaryFeedbackForm.js'

const FeedbackBeneficiaryScreen = (props) => {
	return (
		<View style={styles.screen}>
			<BeneficiaryFeedbackForm
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

export default FeedbackBeneficiaryScreen
