import client from './client.js'

const postNewLog = (body, token) => {
	return new Promise((resolve, reject) => {
		client
			.post('/logsheet', body, {
				headers: { token: token },
			})
			.then((response) => resolve(response))
			.catch((response) => {
				console.error('Error filling the log sheet:\n' + response)
				reject(response)
			})
	})
}
export default { postNewLog }
