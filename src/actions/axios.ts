import axios from 'axios'
import CONFIG from '../config'
import { authStore } from '@stores/implementation'

const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/v1',
	withCredentials: true
})

const API = axios.create({
	baseURL: CONFIG.BASE_API_URL,
	withCredentials: true
})

API.interceptors.request.use(request => {
	let interlayer: string

	if (authStore.isFrame) {
		interlayer = '/rest'
	} else {
		interlayer = '/v1'
	}

	request.headers['Authorization'] = `Bearer ${ authStore.getToken() }`

	if (authStore.isFrame) {
		request.headers['Timestamp'] = authStore.getTimestamp()
	}

	if (authStore.isFrame) {
		request.headers['User'] = authStore.getUserId()
	}

	request.url = interlayer + request.url

	return request
})


export { API, AUTH }
