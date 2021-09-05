import client from './client.js'

const postNewVolunteerFeedback = (body, token) => {
	return new Promise((resolve, reject) => {
		client
			.post('/feedback/volunteer', body, {
				headers: { token: token },
			})
			.then((response) => resolve(response))
			.catch((response) => {
				console.error(
					'Error filling the volunteer feedback form:\n' + response,
				)
				reject(response)
			})
	})
}

export default { postNewVolunteerFeedback }
