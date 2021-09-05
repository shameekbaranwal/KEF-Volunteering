import React, { useEffect, useContext } from 'react'
import { StyleSheet, Alert, ImageBackground } from 'react-native'

import { SkypeIndicator } from 'react-native-indicators'
import Colors from '../constants/Colors.js'
import AppContext from '../components/AppContext.js'
import { scale } from 'react-native-size-matters'

export default SplashScreen = (props) => {
	const globalContext = useContext(AppContext) //With globalContext you can make necessary changes to global variables provided by AppContext

	//see if token exists. if yes, then get events and go to the home page.
	//if no, then go to the welcome screen in a second.
	//if any error occurred while getting events with the token, empty out the token and log the user out.
	useEffect(() => {
		globalContext
			.asyncGetToken()
			.then((token) => {
				globalContext
					.eventGetter(token)
					.then(() => props.navigation.navigate('AfterLogin'))
					.catch((e) => {
						props.navigation.navigate('Welcome')
						Alert.alert(
							'Error',
							'Your login session seems to have expired. Please verify your credentials again.',
						)
						console.error(
							'Fatal error on splash screen when token was found to be:\n' +
								token +
								'\nbut the events could not be obtained:\n' +
								e,
						)
					})
			})
			.catch(() => {
				//if token doesn't exist, just load up to the Welcome Screen in a second
				setTimeout(() => {
					props.navigation.navigate('Welcome')
				}, 1000)
			})
	}, [])

	return (
		<ImageBackground
			style={styles.Image}
			source={require('../assets/Kotak_logo_high_resolution.png')}
			resizeMode='contain'
		>
			<SkypeIndicator
				style={styles.loading}
				animating={true}
				size={55}
				count={4}
				color={'red'}
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: '15%',
	},
	Image: {
		flex: 1,
		backgroundColor: Colors.white,
	},
})
