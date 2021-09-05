import React, { useState, useContext } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'

import BlueFooter from '../components/BlueFooter'
import Colors from '../constants/Colors'
import LoginForm from '../components/Forms/LoginForm/LoginForm.js'
import appLoginUser from '../api/loginUser.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import AppContext from '../components/AppContext.js'

const LoginScreen = (props) => {
	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	const [showLoading, setShowLoading] = useState(false)
	return (
		<View style={styles.screen}>
			<ImageBackground
				source={require('../assets/Girls.png')}
				style={styles.bg}
				blurRadius={0.5}
			>
				<View style={styles.formContainer}>
					<LoginForm
						onSubmit={(values) => {
							const body = values
							setShowLoading(true)

							appLoginUser
								.loginUser(body)
								.then((response) => {
									console.log(response.data.info)

									if (response.ok) {
										globalContext
											.updateToken(response.data.token)
											.then(() => {
												globalContext
													.eventGetter(
														response.data.token,
													)
													.then((response) => {
														setShowLoading(false)

														props.navigation.navigate(
															'AfterLogin',
														)
													})
													.catch((e) => {
														console.error(
															'Logged in but couldnt get events.',
														)
													})
											})
											.catch(() => {
												setShowLoading(false)
												alert(
													'An error occurred. Please restart the app and try again.',
												)
											})
									} else {
										setShowLoading(false)
										alert(
											'Your email and phone does not seem to be valid. Please recheck and try again.',
										)
										// props.navigation.navigate('Welcome')
									}
								})
								.catch((error) => {
									setShowLoading(false)
									alert(
										'Your email and phone does not seem to be valid. Please recheck and try again.',
									)
									// props.navigation.navigate('Welcome')
								})
						}}
					/>
				</View>
				<CustomActivityIndicator show={showLoading} />
			</ImageBackground>
			<BlueFooter />
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},

	bg: {
		backgroundColor: Colors.light,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	formContainer: {
		position: 'relative',
		top: '10%',
		width: '100%',
		height: 'auto',
	},
})
export default LoginScreen
