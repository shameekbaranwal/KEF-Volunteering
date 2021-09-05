import React, { useState } from 'react'
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Text,
	Image,
} from 'react-native'
import Colors from '../constants/Colors'
import { Octicons } from '@expo/vector-icons'

function Card({
	title,
	quote,
	description,
	subTitle,
	image,
	marginBottom = '5%',
}) {
	const [showFull, setShowFull] = useState(false)
	return (
		<TouchableWithoutFeedback onPress={() => setShowFull(!showFull)}>
			<View style={[styles.card, { marginBottom: marginBottom }]}>
				<Image style={styles.image} source={image} resizeMode='cover' />
				<Text style={styles.quote}>{quote}</Text>

				{showFull && (
					<>
						<Octicons
							style={styles.leftIcon}
							name='quote'
							size={16}
						/>
						<Text style={styles.mainText}>{subTitle}</Text>
						<Octicons
							style={[
								styles.rightIcon,
								{ transform: [{ rotateZ: '180deg' }] },
							]}
							name='quote'
							size={16}
						/>
					</>
				)}
				<Text style={styles.Text}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 25,
		backgroundColor: Colors.light,
		marginTop: '5%',
		overflow: 'hidden',
	},
	Text: {
		marginRight: '5%',
		marginVertical: '1%',
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.primary,

		textAlign: 'right',
	},
	description: {
		fontSize: 14,
		marginRight: '5%',
		color: Colors.secondary,

		marginBottom: '5%',
		textAlign: 'right',
	},
	mainText: {
		fontSize: 12,
		paddingHorizontal: '10%',
		paddingBottom: '2%',
		textAlign: 'center',
	},
	image: {
		alignSelf: 'center',
		width: 180,
		height: 180,
		// padding: 200,
		marginVertical: '3%',
		borderRadius: 200,
	},
	quote: {
		fontSize: 16,
		paddingTop: '2%',
		color: Colors.secondary,
		fontWeight: 'bold',
		paddingHorizontal: '2%',
		textAlign: 'center',
	},
	leftIcon: {
		marginStart: '5%',
	},
	rightIcon: {
		alignSelf: 'flex-end',
		marginEnd: '5%',
		marginBottom: '5%',
	},
})
export default Card
