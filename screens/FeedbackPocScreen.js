import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors.js'
import InterventionFeedbackForm from '../components/Forms/FeedbackForms/InterventionFeedbackForm.js'

const FeedbackPocScreen = (props) => {
	return (
		<View style={styles.screen}>
			<InterventionFeedbackForm
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
		marginBottom: '-10%',
	},
})

export default FeedbackPocScreen
