import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from '../constants/Colors'

import WelcomeScreen from '../screens/WelcomeScreen'
import JoinUsScreen from '../screens/JoinUsScreen'
import AfterLoginScreen from '../screens/AfterLoginScreen'
import LogFormScreen from '../screens/LogFormScreen'
import FeedbackScreen from '../screens/FeedbackScreen'
import LoginScreen from '../screens/LoginScreen'
import CalendarViewScreen from '../screens/CalendarViewScreen'
import ListViewScreen from '../screens/ListViewScreen'
import ScheduleEventScreen from '../screens/ScheduleEventScreen'
import HeaderLogo from '../components/HeaderLogo'
import TestimonialScreen from '../screens/TestimonialScreen'
import FeedbackVolunteerScreen from '../screens/FeedbackVolunteerScreen'
import FeedbackBeneficiaryScreen from '../screens/FeedbackBeneficiaryScreen'
import FeedbackPocScreen from '../screens/FeedbackPocScreen'
import JoinUsBeneficiaryScreen from '../screens/JoinUsBeneficiaryScreen'
import JoinUsVolunteerScreen from '../screens/JoinUsVolunteerScreen'
import SplashScreen from '../screens/SplashScreen'
import { scale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const Stack = createStackNavigator()

function AppStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.secondary,
				},
				headerTintColor: Colors.white,
				headerTitleStyle: {
					fontWeight: 'bold',
					justifyContent: 'flex-end',
					fontSize: scale(16),
				},
				headerRight: () => <HeaderLogo />,
			}}
		>
			<Stack.Screen
				name='Splash'
				component={SplashScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='JoinUs'
				component={JoinUsScreen}
				options={{ title: 'Join Us' }}
			/>
			<Stack.Screen
				name='JoinUsVolunteer'
				component={JoinUsVolunteerScreen}
				options={{ title: 'Volunteer' }}
			/>
			<Stack.Screen
				name='JoinUsBeneficiary'
				component={JoinUsBeneficiaryScreen}
				options={{ title: 'Beneficiary' }}
			/>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen
				name='Testimonial'
				component={TestimonialScreen}
				options={{ title: 'Testimonials' }}
			/>
			<Stack.Screen
				name='AfterLogin'
				component={AfterLoginScreen}
				options={{ title: 'Home', headerLeft: null }}
			/>
			<Stack.Screen
				name='LogForm'
				component={LogFormScreen}
				options={{ title: 'Logsheet' }}
			/>
			<Stack.Screen
				name='Feedback'
				component={FeedbackScreen}
				options={{ title: 'Feedback' }}
			/>
			<Stack.Screen
				name='BottomTab'
				component={BottomTabNavigator}
				options={{ title: 'Activities' }}
			/>
			<Stack.Screen
				name='CreateEvent'
				component={ScheduleEventScreen}
				options={{ title: 'Create Event' }}
			/>
			<Stack.Screen
				name='FeedbackBeneficiary'
				component={FeedbackBeneficiaryScreen}
				options={{ title: 'Beneficiary' }}
			/>
			<Stack.Screen
				name='FeedbackVolunteer'
				component={FeedbackVolunteerScreen}
				options={{ title: 'Volunteer' }}
			/>
			<Stack.Screen
				name='FeedbackPoc'
				component={FeedbackPocScreen}
				options={{ title: 'Intervention' }}
			/>
		</Stack.Navigator>
	)
}

const Tab = createBottomTabNavigator()
const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					position: 'absolute',
					bottom: 25,
					left: '5%',
					right: '5%',
					elevation: 0,
					backgroundColor: '#fff',
					borderRadius: 15,
					height: 60,
					...styles.shadow,
				},
			}}
		>
			<Tab.Screen
				name='CalendarView'
				component={CalendarViewScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<AntDesign
								name='calendar'
								size={20}
								style={{
									color: focused
										? Colors.secondary
										: '#748c94',
								}}
							/>
							<Text
								style={{
									color: focused
										? Colors.secondary
										: '#748c94',
									fontSize: 12,
								}}
							>
								Calendar
							</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='ListView'
				component={ListViewScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Entypo
								name='list'
								size={20}
								style={{
									color: focused
										? Colors.secondary
										: '#748c94',
								}}
							/>
							<Text
								style={{
									color: focused
										? Colors.secondary
										: '#748c94',
									fontSize: 12,
								}}
							>
								Search
							</Text>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
})

export default AppStackNavigator
