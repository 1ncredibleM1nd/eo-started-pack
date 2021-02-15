import axios from './axios';

let origin = 'https://backend.chat.dev.prodamus.pro'


function getMessages(conversationId: string, page: number, school: string) {

    return axios.get(`${origin}/v1/conversation/get-messages?conversationId=${conversationId}&page=${page}&school=${school}`).then(response => {
        //console.log('getMessages', response)
        return {
            messages: response.data.data,
        }
    })
}

function getConversations(school: string) {

    return axios.get(`${origin}/v1/conversation/get-conversations?school=${school}&page=${1}`).then(response => {

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
    return axios.post(`${origin}/v1/conversation/send-message`, body).then(response => {
        console.log('sendMsg', response)
        return {
            menu: response.data.data,
        }
    })
}

function isLogged() {
    return axios.get(`${origin}/v1/account/is-logged`)
        .then((response) => response)
        .catch((error) => error)
}

async function setSession(sessionId: any) {
    const formData = new FormData();
    formData.append('encrypted_session_data', sessionId);

    return axios.post(`/api/v1/user/set-session`, formData, {
        headers: {
            withCredentials: true,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

}

export {
    sendMsg,
    getConversations,
    getMessages,
    isLogged,
    setSession

};
