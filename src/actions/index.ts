import { API, AUTH } from './axios'
import { contactStore } from '@stores/implementation'
import qs from 'qs'

function getMessages(conversationId: string, page: number, school_id: string) {
	let isId: boolean = false
	if (school_id !== null) isId = true
	let id = `schoolId=${school_id}`
	return API.get(`/conversation/get-messages?conversationId=${conversationId}&page=${page}${isId ? '&' + id : ''}`)
		.then(response => {
			return { messages: response.data.data }
		})
}

function getConversations(school_id?: any, page?: number) {
	let search: any = []
	search['query'] = contactStore.search
	search['socials'] = Object.keys(contactStore.socials).filter((key: string) => contactStore.socials[key])
	let params = {}
	params['search'] = search
	params['page'] = page
	school_id ? params['schoolId'] = school_id : null

	return API.get(`/conversation/get-conversations`, {
		params,
		paramsSerializer: params => {
			return qs.stringify(params)
		}
	}).then(response => {
		return { data: response.data.data }
	})
}

async function sendMsgFile(formData: any) {
	return API.post(`/conversation/send-message`, formData)
		.then((response: any) => {
			return { menu: response.data.data }
		})
}

function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
	let body = { conversationSourceAccountId, conversationId, schoolId, message }
	return API.post(`/conversation/send-message`, body)
		.then(response => {
			return { menu: response.data.data }
		})
}

function getUserData() {
	return API.get('/account/get-account')
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
	return API.get('/account/get-schools')
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
