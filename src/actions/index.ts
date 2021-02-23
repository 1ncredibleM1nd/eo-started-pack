import {API, AUTH} from './axios';


function getMessages(conversationId: string, page: number, school_id: string) {
    return API(localStorage.getItem('token')).get(`/conversation/get-messages?conversationId=${conversationId}&page=${page}&schoolId=${school_id}`).then(response => {
        return {
            messages: response.data.data,
        }
    })
}

function getConversations(school_id: string) {
    return API(localStorage.getItem('token')).get(`/conversation/get-conversations?schoolId=${school_id}&page=${1}`).then(response => {
        return {data: response.data.data}
    })
}

function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
    let body = {conversationSourceAccountId, conversationId, schoolId, message}
    return API(localStorage.getItem('token')).post(`/conversation/send-message`, body).then(response => {
        return {menu: response.data.data,}
    })
}

function getUserData() {
    return API(localStorage.getItem('token')).get('/account/get-account')
        .then((response) => response)
        .catch((error) => error)
}

function isLogged() {
    return AUTH.get(`/account/is-logged`,)
        .then((response) => response)
        .catch((error) => error)
}

function setSession(sessionId: any) {
    const formData = new FormData();
    formData.append('encrypted_session_data', sessionId);
    return AUTH.post(`/account/set-session`, formData,);
}

function getSchools() {
    return API(localStorage.getItem('token'))
        .get('/account/get-schools')
        .then(res => res)
        .catch(error => error)
}

export {
    sendMsg,
    getConversations,
    getMessages,
    isLogged,
    setSession,
    getUserData,
    getSchools
};
