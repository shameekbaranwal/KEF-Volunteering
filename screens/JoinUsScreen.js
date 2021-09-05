import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import AppButton from '../components/AppButton.js'
import BlueFooter from '../components/BlueFooter.js'
import Colors from '../constants/Colors.js'
import { scale } from 'react-native-size-matters'

const JoinUsVolunteerScreen = (props) => {
	return (
		<View style={styles.screen}>
			<View
				style={{
					height: '70%',
					justifyContent: 'center',
					alignItems: 'center',
					borderBottomColor: 'grey',
					borderBottomWidth: 2,
				}}
			>
				<AppButton
					title='Join us as a Volunteer'
					onPress={() => props.navigation.navigate('JoinUsVolunteer')}
					styleButton={styles.button}
					styleText={styles.text}
				/>
				<AppButton
					title='Join us as a Beneficiary'
					onPress={() =>
						props.navigation.navigate('JoinUsBeneficiary')
					}
					styleButton={styles.button}
					styleText={styles.text}
				/>
			</View>

			<BlueFooter styles={{ height: '30%' }} />
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		justifyContent: 'space-around',
		// alignItems: 'center',
	},
	button: {
		height: 'auto',
		width: '82%',
		marginVertical: '3%',
		paddingHorizontal: '3%',
		paddingVertical: '10%',
		backgroundColor: Colors.light,
	},
	text: {
		fontSize: scale(24),
		fontWeight: 'bold',
	},
})

export default JoinUsVolunteerScreen
