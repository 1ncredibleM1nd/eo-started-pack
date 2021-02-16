import axios from './axios';

let origin = 'https://backend.chat.dev.prodamus.pro'


function getMessages(conversationId: string, page: number, school: string) {

    return axios.get(`${origin}/v1/conversation/get-messages?conversationId=${conversationId}&page=${page}&school=${school}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        //console.log('getMessages', response)
        return {
            messages: response.data.data,
        }
    })
}

function getConversations(school: string) {
    return axios.get(`${origin}/v1/conversation/get-conversations?school=${school}&page=${1}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {

        // console.log('getConversations', response.data.data)

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
    return axios.post(`${origin}/v1/conversation/send-message`, body, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        console.log('sendMsg', response)
        return {
            menu: response.data.data,
        }
    })
}

function isLogged() {
    return axios.get(`${origin}/v1/account/is-logged`, {withCredentials: true})
        .then((response) => response)
        .catch((error) => error)
}




async function setSession(sessionId: any) {
    const formData = new FormData();
    formData.append('encrypted_session_data', sessionId);

    return axios.post(`${origin}/v1/account/set-session`, formData, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    });

}

export {
    sendMsg,
    getConversations,
    getMessages,
    isLogged,
    setSession

};
