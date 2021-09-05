import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Colors from '../constants/Colors'

const RedKotakBar = (props) => {
	return (
		<View style={styles.appBar}>
			<Image
				source={require('../assets/KEF_Header_logo.png')}
				style={styles.headerImage}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	appBar: {
		backgroundColor: Colors.secondary,
		width: '100%',
		height: '9%',
		padding: 4,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	headerImage: {
		height: '80%',
		width: 200,
	},
})

export default RedKotakBar
