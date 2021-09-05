import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ScheduleEventForm from '../components/Forms/EventsForm/ScheduleEventForm.js';
import Colors from '../constants/Colors.js';

const ScheduleEventScreen = (props) => {
	return (
		<View style={styles.screen}>
			<ScheduleEventForm
				returnToHome={() => props.navigation.navigate('AfterLogin')}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '-8%',
	},
});

export default ScheduleEventScreen;
