import axios from './axios';

function getMenu() {
    return axios.get('/api/v1/funnel/load-config').then(response => {
        console.log('Menu data - ', response.data)
        return {
            menu: response.data.data,
        }
    })
}

function sendData(data: any) {
    console.log('Sending data', data)
    return axios.post('/api/v1/funnel/save', JSON.stringify(data));
}

function getFunnel(id: number) {
    return axios.get(`/api/v1/funnel/get/${id}`).then(response => {
        console.log('Funnel data - ', response.data)
        return {
            script: response.data.script,
            graph: response.data.graph,
            variables: response.data.variables
        }
    })
}

export {
    getMenu,
    sendData,
    getFunnel
};