import {API, AUTH} from './axios'


function getMessages(conversationId: string, page: number, school_id: string) {
	let isId: boolean = false
	if (school_id !== null) isId = true
	let id = `schoolId=${school_id}`
	return API(localStorage.getItem('token'))
		.get(`/conversation/get-messages?conversationId=${conversationId}&page=${page}${isId ? '&' + id : ''}`)
		.then(response => {
			return {
				messages: response.data.data
			}
		})
}

function getConversations(school_id: string) {
	let isId: boolean = false
	if (school_id !== null) isId = true
	let id = `schoolId=${school_id}`
	
	return API(localStorage.getItem('token')).get(`/conversation/get-conversations?${isId ? id + '&' : ''}page=${1}`).then(response => {
		return {data: response.data.data}
	})
}

async function sendMsgFile(formData: any) {
	return API(localStorage.getItem('token')).post(`/conversation/send-message`, formData, {
			headers: {
				'cache': false,
				'Content-Type': false,
				'processData': false,
				'Access-Control-Allow-Origin': '*',
				'crossDomain': true
			}
		})
		.then(response => {
			return {menu: response.data.data}
		})
}


function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
	let body = {conversationSourceAccountId, conversationId, schoolId, message}
	return API(localStorage.getItem('token')).post(`/conversation/send-message`, body)
		.then(response => {
			return {menu: response.data.data}
		})
}

function getUserData() {
	return API(localStorage.getItem('token')).get('/account/get-account')
		.then((response) => response)
		.catch((error) => error)
}

function isLogged() {
	return AUTH.get(`/account/is-logged`)
		.then((response) => response)
		.catch((error) => error)
}

function setSession(sessionId: any) {
	const formData = new FormData()
	formData.append('encrypted_session_data', sessionId)
	return AUTH.post(`/account/set-session`, formData)
}

function getSchools() {
	return API(localStorage.getItem('token'))
		.get('/account/get-schools')
		.then(res => res)
		.catch(error => error)
}

export {
	sendMsgFile,
	sendMsg,
	getConversations,
	getMessages,
	isLogged,
	setSession,
	getUserData,
	getSchools
}
