import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

//Use last line of comment to use button(thoda lamba hai but please bear),
// View is used to adjust size of button,Customizable features of button are text color, button color, text size and font weight.
//<View style={styles.testimonials}><AppButton title="READ TESTIMONIALS" styleButton={{backgroundColor:Colors.third}} styleTextSize={{fontSize:15 }} styleTextFontWeight={{fontWeight:"normal"}} styleTextFontColor={{color:Colors.primary}} onPress={() => console.log("Testimonials")} /></View>

const AppButton = (props) => {
	return (
		<TouchableOpacity
			style={[styles.button, props.styleButton]}
			onPress={props.onPress}
		>
			<Text
				allowFontScaling={false}
				style={[
					props.styleText,
					props.styleTextSize,
					props.styleTextFontWeight,
					props.styleTextFontColor,
				]}
			>
				{props.title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		elevation: 10,
		
	},
})
export default AppButton
