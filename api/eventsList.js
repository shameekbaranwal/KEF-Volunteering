import client from './client.js'

const getEventsList = (token) => {
	return new Promise((resolve, reject) => {
		if (!token) reject('Empty token passed.')
		client
			.get('/events', {}, { headers: { token: token } }) //that empty {} in the second parameter is the empty body since it's a GET request.
			.then((response) => resolve(response))
			.catch((response) => {
				console.log('Could not receive events:\n' + response)
				reject(response)
			})
	})
}

export default { getEventsList }
