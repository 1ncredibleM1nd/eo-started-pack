import axios from './axios';



function getMessages(chat_id: string) {
    return axios.get(`https://f49032254288.ngrok.io/v1/conversation/get-messages?chat_id=${chat_id}`).then(response => {

        console.log('getMessages', response)

        return {
            menu: response.data.data,
        }
    })
}

function getConversations() {
    return axios.get(`https://f49032254288.ngrok.io/v1/conversation/get-conversations?school_id=${1}`).then(response => {

        console.log('getConversations', response)

        return {
            menu: response.data.data,
        }
    })
}

function sendMsg(chat_id: string, message: string) {
    return axios.get(`https://f49032254288.ngrok.io/v1/conversation/send_msg?chat_id=${chat_id}`).then(response => {

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