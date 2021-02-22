import axios from 'axios';
import CONFIG from "../config";

let isRest: string = 'v1';
let isFramed = false;
let timestamp: string
let headers: {}

function getFrame(url: string = 'MTIzNDU2NzhNVEF4WXpSallUUXlNemhoTUdJNU1qTTRNakJrWTJNMU1EbGhObVkzTlRnME9XST0=') {
    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }
    if (url.length > 0) {
        let arr = atob(url).split('_')
        timestamp = arr[0]
    }
    isRest = isFramed ? 'rest' : 'v1'
    headers = {'Authorization': `Bearer ${isFramed ? url : localStorage.getItem('token')}`,}
    isFramed ? headers['Timestamp'] = timestamp : headers
    return isFramed
}


const AUTH = axios.create({
    baseURL: CONFIG.BASE_API_URL + '/' + isRest,
    withCredentials: true,
});

const API_IFRAME = axios.create({
    baseURL: CONFIG.BASE_API_URL
});
const API = (token: string) => axios.create({
    baseURL: CONFIG.BASE_API_URL + '/' + isRest,
    headers: {'Authorization': `Bearer ${token}`},
    withCredentials: true,
});


export {API, AUTH, API_IFRAME, getFrame};