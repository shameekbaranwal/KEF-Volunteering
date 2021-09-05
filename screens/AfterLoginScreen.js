//This is the screen which will appear just after an user has logged in.
import React, { useEffect, useContext } from 'react'
import {
	View,
	StyleSheet,
	ImageBackground,
	BackHandler,
	Alert,
} from 'react-native'
import { scale } from 'react-native-size-matters'

import BlueFooter from '../components/BlueFooter'
import AppButton from '../components/AppButton'
import Colors from '../constants/Colors'
import useBackButton from '../components/BackButtonHandler.js'
import AppContext from '../components/AppContext.js'

const AfterLoginScreen = (props) => {
	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	useBackButton(() =>
		back(() => {
			globalContext
				.updateToken('')
				.then(() => {
					props.navigation.navigate('Welcome')
					console.log('Logged out.')
				})
				.catch(() => {
					alert(
						'There was an error logging out. Restart the app and try again.',
					)
				})
		}),
	)

	return (
		<View style={styles.screen}>
			<ImageBackground
				source={require('../assets/KEF_kids_pic.png')}
				style={styles.buttonContainers}
			>
				<View style={[styles.goToActivities, styles.btns]}>
					<AppButton
						title='View Activity Schedule'
						styleButton={{
							backgroundColor: Colors.fourth,
							paddingVertical: scale(40),
						}}
						styleTextSize={{
							fontSize: scale(22),
							fontWeight: 'bold',
						}}
						styleTextFontWeight={{}}
						styleTextFontColor={{}}
						onPress={() => props.navigation.navigate('BottomTab')}
					/>
				</View>
				<View style={[styles.volunteerLogForm, styles.btns]}>
					<AppButton
						title='Volunteer Log Sheet'
						styleButton={{
							backgroundColor: Colors.fourth,
							paddingVertical: scale(40),
						}}
						styleTextSize={{
							fontSize: scale(22),
							fontWeight: 'bold',
						}}
						styleTextFontWeight={{}}
						styleTextFontColor={{}}
						onPress={() => props.navigation.navigate('LogForm')}
					/>
				</View>
				<View style={[styles.fillTheFeedback, styles.btns]}>
					<AppButton
						title='Give Feedback'
						styleButton={{
							backgroundColor: Colors.fourth,
							paddingVertical: scale(40),
						}}
						styleTextSize={{
							fontSize: scale(22),
							fontWeight: 'bold',
						}}
						styleTextFontWeight={{}}
						styleTextFontColor={{}}
						onPress={() => props.navigation.navigate('Feedback')}
					/>
				</View>
			</ImageBackground>
			<BlueFooter />
		</View>
	)
}

const back = (logout) => {
	Alert.alert(
		'',
		'How do you want to proceed?',
		[
			{
				text: 'Dismiss',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'Log Out', onPress: () => logout() },
			{
				text: 'Exit App',
				onPress: () => BackHandler.exitApp(),
			},
		],
		{ cancelable: true }, //prompt can be dismissed by clicking outside it
	)
	return true //true => override default behaviour. false => don't override, just append.
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	buttonContainers: {
		backgroundColor: Colors.secondary,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	btns: {
		marginVertical: '5%',
	},
	goToActivities: {
		height: '15%',
		opacity: 0.9,
		width: '75%',
	},
	volunteerLogForm: {
		height: '15%',
		opacity: 0.9,
		width: '75%',
	},
	fillTheFeedback: {
		height: '15%',
		opacity: 0.9,
		width: '75%',
	},
})

export default AfterLoginScreen
