// import axios from './axios';

// function getMessages(conversationId: string, page: number) {
//     return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-messages?conversationId=${conversationId}&page=${page}&school=${'test'}`).then(response => {

//         console.log('getMessages', response)

//         return {
//             messages: response.data.data,
//         }
//     })
// }

// function getConversations() {
//     return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-conversations?school=${'test'}&page=${1}`).then(response => {

//         console.log('getConversations', response)

//         return {
//             data: response.data.data,
//         }
//     })
// }

// function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any) {

//     let school = 'test'

//     let body = {
//         conversationSourceAccountId,
//         conversationId,
//         school,
//         message
//     }

//     console.log(body)

//     return axios.post(`https://backend.chat.dev.prodamus.pro/v1/conversation/send-message`, body).then(response => {
//         console.log('sendMsg', response)

//         return {
//             menu: response.data.data,
//         }
//     })
// }





// export {
//     sendMsg,
//     getConversations,
//     getMessages

// };

import axios from './axios';



function getMessages(chat_id: string) {
    return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-messages?chat_id=${chat_id}&page=${1}`).then(response => {

        console.log('getMessages', response)

        return {
            messages: response.data.data,
        }
    })
}

function getConversations() {
    return axios.get(`https://backend.chat.dev.prodamus.pro/v1/conversation/get-conversations?school_id=${10571}&page=${1}`).then(response => {

        console.log('getConversations', response)

        return {
            data: response.data.data,
        }
    })
}

function sendMsg(conversationId: string, message: string) {

    let school = 'prodamus'

    let body = {
        conversationId,
        school,
        message
    }

    return axios.post(`https://backend.chat.dev.prodamus.pro/v1/conversation/send-message?conversationId=${conversationId}`, body).then(response => {
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