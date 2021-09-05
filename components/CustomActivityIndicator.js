import React from 'react'
import { StyleSheet } from 'react-native'
import { SkypeIndicator } from 'react-native-indicators'

import Colors from '../constants/Colors.js'

export default function CustomActivityIndicator({ show, duration }) {
	if (show)
		return (
			<SkypeIndicator
				style={styles.loading}
				animating={true}
				size={55}
				count={4}
				animationDuration={duration || 1000}
				color={'red'}
			/>
		)
	return null
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.9,
		backgroundColor: Colors.white,
	},
})
