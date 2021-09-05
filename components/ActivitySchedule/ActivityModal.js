import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Animated,
	Modal,
	Alert,
	Linking,
	Platform,
} from 'react-native'
// import {MaterialCommunityIcons} from '@expo/vector'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import * as Notifications from 'expo-notifications'

import helper from '../../utilities.js'
import Colors from '../../constants/Colors'

const ModalPopup = ({ visible, children }) => {
	const [showModal, setShowModal] = React.useState(visible)
	const scaleValue = React.useRef(new Animated.Value(0)).current
	React.useEffect(() => {
		toggleModal()
	}, [visible])
	const toggleModal = () => {
		if (visible) {
			setShowModal(true)
			Animated.spring(scaleValue, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start()
		} else {
			setTimeout(() => setShowModal(false), 200)
			Animated.timing(scaleValue, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start()
		}
	}
	return (
		<Modal transparent visible={showModal}>
			<View style={styles.modalBackGround}>
				<Animated.View
					style={[
						styles.modalContainer,
						{ transform: [{ scale: scaleValue }] },
					]}
				>
					{children}
				</Animated.View>
			</View>
		</Modal>
	)
}

const dialCall = (number) => {
	let phoneNumber = ''
	if (Platform.OS === 'android') {
		phoneNumber = `tel:${number}`
	} else {
		phoneNumber = `telprompt:${number}`
	}
	Linking.openURL(phoneNumber)
}

const ActivityModal = (props) => {
	const selectedEvent = props.currentEvent
	// const date = new Date(selectedEvent.date)
	const date = new Date(parseInt(selectedEvent.milliseconds, 10))

	const getNotificationTimes = () => {
		let milliseconds = parseInt(selectedEvent.milliseconds)

		const duration = parseInt(selectedEvent.duration.split(' ')[0])
		const firstNotifTime = milliseconds - 60 * 60 * 1000 //For 1 hour before notification
		const secondNotifTime = milliseconds - 10 * 60 * 1000 //For the 10 minutes before notification
		let thirdNotifTime
		if (parseInt(duration) === 30) {
			thirdNotifTime = milliseconds + 0.5 * 60 * 60 * 1000 //There was one option of a half hour
		} else {
			thirdNotifTime = milliseconds + duration * 60 * 60 * 1000 //For the Feedback notification ("duration" number of hours)
		}

		return [
			new Date(firstNotifTime),
			new Date(secondNotifTime),
			new Date(thirdNotifTime),
		]
	}

	const setNotifications = (firstNotif, secondNotif, thirdNotif) => {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: true,
			}),
		})

		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Your reminder is set!',
				body: `You will receive a reminder 1 hour before and 10 minutes before the scheduled time for "${selectedEvent.activity_name}".`,
			},
			trigger: null,
		})
			.then(console.log)
			.catch((e) =>
				alert(
					'There appears to be some issue with notifications on your device. Please recheck the app permissions and try again.',
				),
			)

		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Reminder',
				body: `The activity "${selectedEvent.activity_name}" is scheduled to begin in one hour.`,
			},
			trigger: firstNotif,
		})
			.then(console.log)
			.catch(console.log)

		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Reminder',
				body: `The activity "${selectedEvent.activity_name}" is scheduled to begin in ten minutes.`,
			},
			trigger: secondNotif,
		})
			.then(console.log)
			.catch(console.log)

		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Reminder',
				body: `Don't forget to fill the feedback form for the event you just attended!`,
			},
			trigger: thirdNotif,
		})
			.then(console.log)
			.catch(console.log)

		console.log(
			'Notifications set for:\n' +
				firstNotif +
				'\n' +
				secondNotif +
				'\n' +
				thirdNotif,
		)
	}

	return (
		<>
			<ModalPopup visible={props.visible}>
				<View>
					<View style={styles.modalHeaderContainer}>
						<View style={styles.modalHeaderTitle}>
							<Text
								style={{
									fontSize: verticalScale(25),
									fontWeight: 'bold',
									color: Colors.secondary,
								}}
							>
								{selectedEvent.activity_name}
							</Text>
						</View>
						<View style={styles.modalHeaderIcon}>
							<TouchableOpacity
								onPress={() => props.onCrossPress(false)}
							>
								<AntDesign
									name='closecircleo'
									size={verticalScale(20)}
									color={Colors.primary}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.details}>{selectedEvent.details}</Text>
					<View style={styles.modalBodyContainer}>
						<View style={styles.dateTimeContainer}>
							<View
								style={[
									styles.modalFieldContainer,
									styles.dateContainer,
								]}
							>
								<Text style={styles.modalBodytitles}>
									Date:
								</Text>
								<Text style={styles.modalBodyText}>
									{helper.convertDate(date)}
								</Text>
							</View>
							<View
								style={[
									styles.modalFieldContainer,
									styles.timeContainer,
								]}
							>
								<Text style={styles.modalBodytitles}>
									Time:
								</Text>
								<Text style={styles.modalBodyText}>
									{helper.convertTime(date)}
								</Text>
							</View>
						</View>

						<View style={styles.sessionDurationContainer}>
							<View
								style={[
									styles.modalFieldContainer,
									styles.sessionContainer,
								]}
							>
								<Text style={styles.modalBodytitles}>
									Session:{' '}
								</Text>
								<Text style={styles.modalBodyText}>
									{'#' + selectedEvent.session}
								</Text>
							</View>
							<View
								style={[
									styles.modalFieldContainer,
									styles.durationContainer,
								]}
							>
								<Text style={styles.modalBodytitles}>
									Duration:{' '}
								</Text>
								<Text style={styles.modalBodyText}>
									{selectedEvent.duration}
								</Text>
							</View>
						</View>

						<View style={styles.modalFieldContainer}>
							<Text style={styles.modalBodytitles}>
								Volunteer in-charge:
							</Text>
							<Text style={styles.modalBodyText}>
								{selectedEvent.volunteer_teacher}
							</Text>

							<View style={styles.phoneContainer}>
								<Text style={styles.modalBodyTextCall}>
									{selectedEvent.volunteer_phone_no}
								</Text>
								<TouchableOpacity
									onPress={() =>
										dialCall(
											selectedEvent.volunteer_phone_no,
										)
									}
									style={styles.modalBodyCallIcon}
								>
									<MaterialIcons
										name='call'
										size={verticalScale(20)}
										color={Colors.lightblue}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.modalFieldContainer}>
							<Text style={styles.modalBodytitles}>
								KEF Member in-charge:
							</Text>
							<Text style={styles.modalBodyText}>
								{selectedEvent.kef_member_incharge}
							</Text>

							<View style={styles.phoneContainer}>
								<Text style={styles.modalBodyTextCall}>
									{selectedEvent.kef_team_phone_no}
								</Text>
								<TouchableOpacity
									onPress={() =>
										dialCall(
											selectedEvent.kef_team_phone_no,
										)
									}
									style={styles.modalBodyCallIcon}
								>
									<MaterialIcons
										name='call'
										size={verticalScale(20)}
										color={Colors.lightblue}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									const [
										firstNotif,
										secondNotif,
										thirdNotif,
									] = getNotificationTimes()

									setNotifications(
										firstNotif,
										secondNotif,
										thirdNotif,
									)
								}}
							>
								<Text
									style={{
										color: Colors.white,
										fontWeight: 'bold',
										fontSize: verticalScale(16),
										marginRight: '5%',
										alignSelf: 'center',
									}}
								>
									Set a Reminder
								</Text>
								<Ionicons
									name='notifications'
									size={verticalScale(20)}
									color={Colors.white}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ModalPopup>
		</>
	)
}

const styles = StyleSheet.create({
	modalBackGround: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '80%',
		backgroundColor: Colors.white,
		padding: '5%',
		borderRadius: 20,
		elevation: 20,
	},
	modalHeaderIcon: {
		// borderWidth: 1,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalHeaderTitle: {
		// borderWidth: 1,
		flex: 4,
		justifyContent: 'center',
	},
	modalHeaderContainer: {
		flexDirection: 'row',
	},
	modalBodyContainer: {
		// borderWidth: 1,
		marginTop: '5%',
	},
	modalBodytitles: {
		fontSize: verticalScale(16),
		fontWeight: 'bold',
	},
	modalBodyText: {
		// borderWidth: 1,
		// marginVertical: 6,
		// padding: 5,
		borderColor: '#808080',
		// borderRadius: 5,
		fontSize: verticalScale(12),
		color: Colors.secondary,
	},
	modalBodyTextCall: {
		// borderWidth: 1,
		marginVertical: '2%',
		borderColor: '#808080',
		borderRadius: verticalScale(5),
		fontSize: verticalScale(12),
		color: Colors.secondary,
		width: '85%',
	},
	modalBodyCallIcon: {
		// borderWidth: 1,
		width: '15%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	phoneContainer: {
		flexDirection: 'row',
		// borderWidth: 1
	},
	buttonContainer: {
		// borderWidth:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		// borderWidth: 1,
		padding: '5%',
		backgroundColor: Colors.secondary,
		borderRadius: verticalScale(20),
		marginTop: '5%',
		elevation: 5,
		flexDirection: 'row',
	},
	modalFieldContainer: {
		backgroundColor: Colors.light,
		elevation: 15,
		marginVertical: '2%',
		padding: '5%',
		borderRadius: verticalScale(10),
	},
	dateTimeContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	},
	dateContainer: {
		// width: '40%',
		// marginHorizontal: '5%',
		width: '48%',
		marginHorizontal: '2%',
		paddingVertical: '5%',
	},
	timeContainer: {
		// width: '40%',
		// marginHorizontal: '5%',
		width: '48%',
		marginHorizontal: '2%',
		paddingVertical: '5%',
	},
	sessionContainer: {
		width: '48%',
		marginHorizontal: '2%',
		paddingVertical: '5%',
	},
	durationContainer: {
		width: '48%',
		marginHorizontal: '2%',
		paddingVertical: '5%',
	},
	sessionDurationContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	},
	details: {
		fontSize: verticalScale(12),
		marginLeft: '4%',
		marginTop: '2%',
	},
})

export default ActivityModal
