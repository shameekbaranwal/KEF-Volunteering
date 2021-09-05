import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors.js'
import VolunteerFeedbackForm from '../components/Forms/FeedbackForms/VolunteerFeedbackForm.js'

const FeedbackVolunteerScreen = (props) => {
	return (
		<View style={styles.screen}>
			<VolunteerFeedbackForm
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

export default FeedbackVolunteerScreen
