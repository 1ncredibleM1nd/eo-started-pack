import axios from 'axios'
import CONFIG from '../config'

let isRest: string = 'v1'

let headers = () => {
	let token = localStorage.getItem('token')
	let userId = localStorage.getItem('userId')
	let timestamp = localStorage.getItem('timestamp')

	let headers = {}

	token ? headers['Authorization'] = `Bearer ${token}` : null
	timestamp ? headers['Timestamp'] = timestamp : null
	userId ? headers['User'] = userId : null

	console.log("Getting headers", headers)

	return headers
}


const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	withCredentials: true
})


const API = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	headers: headers(),
	withCredentials: true
})


export { API, AUTH }
