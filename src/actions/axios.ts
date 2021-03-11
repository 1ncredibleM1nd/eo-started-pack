import axios from 'axios'
import CONFIG from '../config'

let isRest: string = 'v1'

let headers = () => {
	let token = localStorage.getItem('token')
	let userId = localStorage.getItem('userId')
	let timestamp = localStorage.getItem('timestamp')

	let obj = {}

	token ? obj['Authorization'] = `Bearer ${token}` : null
	timestamp ? obj['Timestamp'] = timestamp : null
	userId ? obj['User'] = userId : null

	return obj
}

// if isFrame = true
function setHeader(data: any) {

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


export { API, AUTH, setHeader }
