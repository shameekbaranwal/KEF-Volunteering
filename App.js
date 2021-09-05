import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

import AppStackNavigator from './navigation/AppNavigator'
import AppContext from './components/AppContext'
import apiEvents from './api/eventsList.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
	const [scr, setScr] = useState(false)

	const [eventsList, setEventsList] = useState([]) //its like a global variable
	// const eventListGetter = async (callback) => {
	// 	//its like a global functoion
	// 	apiEvents
	// 		.getEventsList()
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				const arr = [...response.data.data]
	// 				arr.sort((a, b) => b.milliseconds - a.milliseconds)
	// 				setEventsList(arr)
	// 				if (callback) callback(arr)
	// 			} else {
	// 				console.log(response.status + ': ' + response.problem)
	// 				alert(
	// 					'There seems to be some problem with your connection. Please reconnect and try again.',
	// 				)
	// 			}
	// 		})
	// 		.catch((e) => {
	// 			console.error(e)
	// 			alert(
	// 				'There seems to be some problem with your connection. Please reconnect and try again.',
	// 			)
	// 		})
	// }

	const eventGetter = (token) => {
		return new Promise((resolve, reject) => {
			apiEvents
				.getEventsList(token)
				.then((response) => {
					console.log(response.data?.info)
					if (response.ok) {
						const arr = [...response.data.data]
						arr.sort((a, b) => b.milliseconds - a.milliseconds)
						setEventsList(arr)
						resolve(arr)
					} else {
						console.error(
							'Error getting the events list:\n' +
								response.data.info,
						)
						alert(
							'There seems to be a problem with your connection. Please try reconnecting and then restart the app.',
						)
						reject()
					}
				})
				.catch((response) => {
					console.error('Error getting the events list:\n' + response)
					alert(
						'There seems to be a problem with your connection. Please try reconnecting and restart the app.',
					)
					reject()
				})
		})
	}

	//create a new state variable 'token', make it available across all screens via contexts.
	//you can access this context token at any time across the app.
	//the cached token value isn't actually 'get'-ed any time after the app opens once.
	//if ever the cached token gets updated, so does the context token, so no need to update it.
	//the updateToken function is globally available, which - as described - updates the cached token value and the context token values both.

	const [token, setToken] = useState('')
	const [tokenExists, setTokenExists] = useState(false)

	const asyncGetToken = () => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('token')
				.then((token) => {
					if (!token) {
						setToken('')
						// setTokenExists(false)
						reject()
						return
					} else {
						// setTokenExists(true)
						setToken(token)
						resolve(token)
					}
				})
				.catch((e) => {
					console.error('Error in retrieving the token:\n' + e)
					reject()
				})
		})
	}

	const updateToken = (token) => {
		return new Promise((resolve, reject) => {
			AsyncStorage.setItem('token', token)
				.then(() => {
					setToken(token)
					resolve()
				})
				.catch((e) => {
					console.error('Error in updating the token:\n' + e)
					reject()
				})
		})
	}

	const GlobalItems = {
		eventsList,
		// eventListGetter,
		eventGetter,
		setEventsList,

		token,
		asyncGetToken,
		updateToken,
	}

	return (
		<AppContext.Provider value={GlobalItems}>
			<NavigationContainer>
				<AppStackNavigator />
			</NavigationContainer>
		</AppContext.Provider>
	)
}

const styles = StyleSheet.create({})
