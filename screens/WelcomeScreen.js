import React from 'react'
import { View, Text, StyleSheet, BackHandler, Image, Alert,Linking } from 'react-native'
import BlueFooter from '../components/BlueFooter'
import Colors from '../constants/Colors'
import AppButton from '../components/AppButton'
import { scale, verticalScale } from 'react-native-size-matters'

import useBackButton from '../components/BackButtonHandler.js'

const WelcomeScreen = (props) => {
	useBackButton(back)

	return (
		<View style={styles.screen}>
			<View style={styles.kef_image}>
				<Image
					source={require('../assets/Kotak_logo_high_resolution.png')}
					style={{
						resizeMode: 'center',
						height: verticalScale(230),
						width: verticalScale(230),
					}}
				/>
			</View>
			<View style={styles.middleRed}>
				<View style={styles.greeting}>
					<Text style={styles.greetingText} allowFontScaling={false}>
						Hi there!
					</Text>
					<Text style={styles.greetingText} allowFontScaling={false}>
						Let's get started.
					</Text>
				</View>
				<View style={styles.joinUsLoginContainer}>
					<AppButton
						title='Join Us'
						styleButton={{
							...styles.joinUsLoginButton,
							marginBottom: '7%',
						}}
						styleText={{
							fontSize: verticalScale(17),
							fontWeight: '700',
							color: Colors.primary,
						}}
						onPress={() => props.navigation.navigate('JoinUs')}
					/>
					<View>
						<AppButton
							title='Already a member? Login'
							styleButton={{
								...styles.joinUsLoginButton,
								marginBottom: '5%',
							}}
							styleText={{
								fontSize: verticalScale(16),
								fontWeight: '700',
								color: Colors.primary,
							}}
							onPress={() => props.navigation.navigate('Login')}
						/>
					</View>
				</View>
				<View
					style={{
						...styles.testimonialBrochureContainer,
					}}
				>
					<AppButton
						title='TESTIMONIALS'
						styleButton={{
							...styles.testimonialsBrochureButton,
							marginLeft: '1%',
							marginRight: scale(40),
							height: '50%',
						}}
						styleText={{
							fontSize: scale(13.5),
							fontWeight: '500',
							color: Colors.primary,
						}}
						onPress={() => props.navigation.navigate('Testimonial')}
					/>
					<AppButton
						title='VIEW BROCHURE'
						styleButton={{
							...styles.testimonialsBrochureButton,
							marginRight: '1%',
							height: '50%',
						}}
						styleTextSize={{
							fontSize: scale(13.5),
							fontWeight: '500',
							color: Colors.primary,
						}}
						onPress={() => {
							Linking.openURL(
								'https://drive.google.com/file/d/1oqzQ0ELKppWtqzpMCeTW8WeOUzZL-vrk/view?usp=sharing',
							)
						}}
					/>
				</View>
			</View>
			<BlueFooter />
		</View>
	)
}

const back = () => {
	Alert.alert(
		'',
		'Do you want to exit the app?',
		[
			{
				text: 'No',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'Yes', onPress: () => BackHandler.exitApp() },
		],
		{ cancelable: true }, //prompt can be dismissed by clicking outside it
	)
	return true //true => override default behaviour. false => don't override, just append.
}

const styles = StyleSheet.create({
	screen: {
		paddingTop: verticalScale(35),
		flex: 1,
		backgroundColor: Colors.white,
		justifyContent: 'space-between',
	},
	kef_image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	middleRed: {
		borderTopLeftRadius: verticalScale(30),
		borderTopRightRadius: verticalScale(30),
		backgroundColor: Colors.secondary,
		flex: 2,
		paddingTop: '5%',
		//paddingBottom: '5%',
		justifyContent: 'space-between',
	},
	greeting: {
		flex: 0.35,
	},
	greetingText: {
		color: Colors.white,
		fontSize: verticalScale(19),
		paddingLeft: '7%',
	},
	joinUsLoginContainer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: verticalScale(10),
		flex: 1.1,
	},
	joinUsLoginButton: {
		padding: '3.5%',
		backgroundColor: Colors.white,
		height: 'auto',
		width: 'auto',
		//marginVertical: '4%',
	},
	testimonialBrochureContainer: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'center',
		//alignItems: 'center',
		paddingHorizontal: '5%',
	},
	testimonialsBrochureButton: {
		paddingHorizontal: '4%',
		paddingVertical: '5%',
		height: 'auto',
		width: 'auto',
		backgroundColor: Colors.white,
	},
})

export default WelcomeScreen
