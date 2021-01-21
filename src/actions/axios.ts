import axios from 'axios';

const instance = axios.create({
    baseURL: "https://backend.dev.papabot.ru"
});
export default instance;