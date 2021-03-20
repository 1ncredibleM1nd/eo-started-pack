import axios from 'axios'
import CONFIG from '../config'

const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL,
	withCredentials: true
})

const API = axios.create({
	baseURL: CONFIG.BASE_API_URL,
	withCredentials: true
})

AUTH.interceptors.request.use(request => {
	let rest = localStorage.getItem('rest')
	request.url = '/' + rest + request.url
	return request
})

API.interceptors.request.use(request => {
	let rest = localStorage.getItem('rest')
	let token = localStorage.getItem('token')
	let userId = localStorage.getItem('userId')
	let timestamp = localStorage.getItem('timestamp')

	request.headers['Authorization'] = `Bearer ${ token }`
	timestamp ? request.headers['Timestamp'] = timestamp : null
	userId ? request.headers['User'] = userId : null
	request.url = '/' + rest + request.url

	return request
})


export { API, AUTH }
