import axios from 'axios'
import CONFIG from '../config'

let isRest: string = 'v1'

const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	withCredentials: true
})


const API = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
		Timestamp: localStorage.getItem('timestamp') ? localStorage.getItem('timestamp') : null,
		User: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
	},
	withCredentials: true
})


export { API, AUTH }
