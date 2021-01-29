import axios from './axios';



function getMessages(chat_id: string) {
    return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-messages?chat_id=${chat_id}`).then(response => {

        console.log('getMessages', response)

        return {
            menu: response.data.data,
        }
    })
}

function getConversations() {
    return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-conversations?school_id=${1}`).then(response => {

        console.log('getConversations', response)

        return {
            menu: response.data.data,
        }
    })
}

function sendMsg(chat_id: string, message: string) {

    let body = {
        chat_id,
        message
    }

    return axios.post(`https://backend.chat.dev.prodamus.pro/v1/conversation/send-message`, body).then(response => {

        console.log('sendMsg', response)

        return {
            menu: response.data.data,
        }
    })
}





export {
    sendMsg,

    getConversations,
    getMessages

};