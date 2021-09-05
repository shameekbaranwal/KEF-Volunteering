import client from './client.js'

const postNewInterventionFeedback = (body, token) => {
	return new Promise((resolve, reject) => {
		client
			.post('/feedback/intervention', body, {
				headers: { token: token },
			})
			.then((response) => resolve(response))
			.catch((response) => {
				console.error(
					'Error filling the intervention feedback form:\n' +
						response,
				)
				reject(response)
			})
	})
}

export default { postNewInterventionFeedback }
