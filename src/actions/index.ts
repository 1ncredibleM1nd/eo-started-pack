import axios from './axios';

function getMenu() {
    return axios.get('/api/v1/funnel/load-config').then(response => {
        return {
            menu: response.data.data,
        }
    })
}

function sendData(data: any) {
    return axios.post('/api/v1/funnel/save', JSON.stringify(data));
}



export {
    getMenu,
    sendData,

};