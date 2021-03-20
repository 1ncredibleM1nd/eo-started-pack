import axios from 'axios'
import CONFIG from '../config'
import { authStore } from '@stores/implementation'

const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL,
	withCredentials: true
})

const API = axios.create({
	baseURL: CONFIG.BASE_API_URL,
	withCredentials: true
})

AUTH.interceptors.request.use(request => {
	let interlayer: string

	if (authStore.isFrame) {
		interlayer = '/rest'
	} else {
		interlayer = '/v1'
	}

	request.url = interlayer + request.url

	return request
})

API.interceptors.request.use(request => {
	let interlayer: string

	if (authStore.isFrame) {
		interlayer = '/rest'
	} else {
		interlayer = '/v1'
	}

	request.headers['Authorization'] = `Bearer ${ authStore.token }`

	if (authStore.isFrame) {
		request.headers['Timestamp'] = authStore.timestamp
	}

	if (authStore.isFrame) {
		request.headers['User'] = authStore.userId
	}

	request.url = interlayer + request.url

	return request
})


export { API, AUTH }
