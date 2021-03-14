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


AUTH.interceptors.request.use(req => {
	let rest = localStorage.getItem('rest')
	req.url = '/' + rest + req.url
	console.log('Request', req.url, 'with headers', req.headers)
	return req;
});

API.interceptors.request.use(req => {
	let rest = localStorage.getItem('rest')
	let token = localStorage.getItem('token')
	let userId = localStorage.getItem('userId')
	let timestamp = localStorage.getItem('timestamp')

	req.headers['Authorization'] = `Bearer ${token}`;
	timestamp ? req.headers['Timestamp'] = timestamp : null
	userId ? req.headers['User'] = userId : null

	req.url = '/' + rest + req.url

	console.log('Request', req.url, 'with headers', req.headers)

	return req;
});


export { API, AUTH }
