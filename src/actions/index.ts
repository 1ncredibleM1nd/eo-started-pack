import axios from './axios';

const origin = 'https://backend.chat.dev.prodamus.pro'
let isRest: string;
let isFramed = false;
let token: string;
let timestamp: string
let headers: {}

function getFrame(url: string = 'MTIzNDU2NzhfYzRjYTQyMzhhMGI5MjM4MjBkY2M1MDlhNmY3NTg0OWI=') {
    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }
    isFramed = true
    isRest = isFramed ? 'rest' : 'v1'
    if (url.length > 0) {
        let arr = atob(url).split('_')
        token = btoa(arr[0] + arr[1])
        timestamp = arr[0]
    }
    headers = {'Authorization': `Bearer ${isFramed ? token : localStorage.getItem('token')}`,}
    isFramed ? headers['Timestamp'] = timestamp : headers

    return isFramed
}


function getMessages(conversationId: string, page: number, school: string) {
    return axios.get(`${origin}/${isRest}/conversation/get-messages?conversationId=${conversationId}&page=${page}&school=${school}`, {
        withCredentials: true,
        headers
    }).then(response => {
        //console.log('getMessages', response)
        return {
            messages: response.data.data,
        }
    })
}

function getConversations(school: string) {
    return axios.get(`${origin}/${isRest}/conversation/get-conversations?school=${school}&page=${1}`, {
        withCredentials: true,
        headers
    }).then(response => {
        return {
            data: response.data.data,
        }
    })
}

function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, school: string) {
    let body = {
        conversationSourceAccountId,
        conversationId,
        school,
        message
    }
    return axios.post(`${origin}/${isRest}/conversation/send-message`, body, {
        withCredentials: true,
        headers
    }).then(response => {
        console.log('sendMsg', response)
        return {
            menu: response.data.data,
        }
    })
}

function isLogged() {
    return axios.get(`${origin}/${isRest}/account/is-logged`, {withCredentials: true})
        .then((response) => response)
        .catch((error) => error)
}

function setSession(sessionId: any) {
    const formData = new FormData();
    formData.append('encrypted_session_data', sessionId);
    return axios.post(`${origin}/${isRest}/account/set-session`, formData, {
        withCredentials: true,
    });

}

export {
    sendMsg,
    getConversations,
    getMessages,
    isLogged,
    setSession,
    getFrame
};
