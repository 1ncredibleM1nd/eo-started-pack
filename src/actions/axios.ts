import axios from 'axios'
import CONFIG from '../config'

let isRest: string = 'v1'





const AUTH = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	withCredentials: true
})


const API = axios.create({
	baseURL: CONFIG.BASE_API_URL + '/' + isRest,
	withCredentials: true
})


export { API, AUTH }
