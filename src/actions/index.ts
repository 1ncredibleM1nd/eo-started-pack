import { API, AUTH } from './axios'
import { contactStore } from '@stores/implementation'
import qs from 'qs'

async function getMessages(conversationId: string, page: number, school_id: string) {
	let isId: boolean = false
	if (school_id !== null) isId = true
	let id = `schoolId=${school_id}`
	const response = await API.get(`/conversation/get-messages?conversationId=${conversationId}&page=${page}${isId ? '&' + id : ''}`)
	return { messages: response.data.data }
}

async function getConversations(school_id?: any, page?: number) {
	let search: any = []
	search['query'] = contactStore.search
	search['socials'] = Object.keys(contactStore.socials).filter((key: string) => contactStore.socials[key])
	let params = {} // d
	params['search'] = search
	params['page'] = page
	school_id ? params['schoolId'] = school_id : null

	const response = await API.get(`/conversation/get-conversations`, {
		params,
		paramsSerializer: params_2 => {
			return qs.stringify(params_2)
		}
	})
	return { data: response.data.data }
}

async function sendMsgFile(formData: any) {
	return API.post(`/conversation/send-message`, formData)
		.then((response: any) => {
			return { menu: response.data.data }
		})
}

async function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
	let body = { conversationSourceAccountId, conversationId, schoolId, message }
	const response = await API.post(`/conversation/send-message`, body)
	return { menu: response.data.data }
}

async function getUserData() {
	try {
		return await API.get('/account/get-account')
	} catch (error) {
		return error
	}
}

async function isLogged() {
	try {
		return await AUTH.get(`/account/is-logged`)
	} catch (error) {
		return error
	}
}

function setSession(sessionId: any) {
	const formData = new FormData()
	formData.append('encrypted_session_data', sessionId)
	return AUTH.post(`/account/set-session`, formData)
}

async function getSchools() {
	try {
		return await API.get('/account/get-schools')
	} catch (error) {
		return error
	}
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
