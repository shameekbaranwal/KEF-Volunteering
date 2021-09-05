import client from './client.js'

const loginUser = (body, headers) => {
	return new Promise((resolve, reject) => {
		client
			.post('/login', body, { headers })
			.then((response) => resolve(response))
			.catch((response) => {
				console.error('Error:\n' + response)
				reject(response)
			})
	})
}

export default { loginUser }
