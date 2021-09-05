import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppButton from '../components/AppButton.js'
import BlueFooter from '../components/BlueFooter.js'
import Colors from '../constants/Colors.js'
import {scale} from "react-native-size-matters"

const FeedBackScreen = (props) => {
	return (
		<>
			<View style={styles.screen}>
				<AppButton
					title='Volunteer Feedback Form'
					onPress={() =>
						props.navigation.navigate('FeedbackVolunteer')
					}
					styleButton={styles.button}
					styleText={styles.text}
				/>
				<AppButton
					title='Beneficiary Feedback Form'
					onPress={() =>
						props.navigation.navigate('FeedbackBeneficiary')
					}
					styleButton={styles.button}
					styleText={styles.text}
				/>
				<AppButton
					title='Intervention Feedback Form'
					onPress={() => props.navigation.navigate('FeedbackPoc')}
					styleButton={styles.button}
					styleText={styles.text}
				/>
			</View>
			<BlueFooter />
		</>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderBottomColor:"grey",
		borderBottomWidth:2
	},
	button: {
		height: 'auto',
		width: '85%',
		marginVertical: '3%',
		paddingHorizontal: '3%',
		paddingVertical: '8%',
		backgroundColor: Colors.light,
	},
	text: {
		fontSize: scale(21),
		fontWeight: 'bold',
	},
})

export default FeedBackScreen
