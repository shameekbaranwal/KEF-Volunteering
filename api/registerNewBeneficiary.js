import client from './client.js'

const postNewBeneficiary = (body, headers) => {
	return new Promise((resolve, reject) => {
		client
			.post('/register/beneficiary', body, { headers })
			.then((response) => resolve(response))
			.catch((response) => {
				console.error(
					'Error filling the beneficiary registration form:\n' +
						response,
				)
				reject(response)
			})
	})
}

export default { postNewBeneficiary }
