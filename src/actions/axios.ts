import axios from 'axios';
import CONFIG from "../config";

let isRest: string = 'v1';
let isFramed = false;
let timestamp: string
let headers: any

function getFrame(url: string = 'MTIzNDU2NzhfT1RRd1gySmxNV05qTVdSbVpXTmlaR0ppWmpJNE5qZGpZakU0WWpoaVpUUmlOR1k1') {
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
    headers = (token: string) => {
        return {
            'Authorization': `Bearer ${isFramed ? url : token}`
        }
    }
    isFramed ? headers()['Timestamp'] = timestamp : headers()
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
    headers: headers(token),
    withCredentials: true,
});


export {API, AUTH, API_IFRAME, getFrame};