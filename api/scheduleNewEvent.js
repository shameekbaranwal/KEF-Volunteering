import client from './client.js'

const scheduleNewEvent = (body, token) => {
	return new Promise((resolve, reject) => {
		client
			.post('/events', body, {
				headers: { token: token },
			})
			.then((response) => resolve(response))
			.catch((response) => {
				console.error(
					'Error filling the beneficiary feedback form:\n' + response,
				)
				reject(response)
			})
	})
}

export default { scheduleNewEvent }
