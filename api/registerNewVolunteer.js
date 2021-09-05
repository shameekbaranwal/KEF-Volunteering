import client from './client.js'

const postNewVolunteer = (body, headers) => {
	return new Promise((resolve, reject) => {
		client
			.post('/register/volunteer', body, { headers })
			.then((response) => resolve(response))
			.catch((response) => {
				console.error('Error:\n' + response)
				reject(response)
			})
	})
}

export default { postNewVolunteer }
