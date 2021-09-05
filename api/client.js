import { create } from 'apisauce'

const apiClient = create({
	baseURL: 'https://vast-river-10450.herokuapp.com/api',
})

export default apiClient
