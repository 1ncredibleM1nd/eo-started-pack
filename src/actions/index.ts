import { API, AUTH } from './axios'
import { contactStore } from '@stores/implementation'
import qs from 'qs'
import { notification } from 'antd'

async function getMessages(conversationId: string, page: number, school_id: string) {
	let isId: boolean = false
	if (school_id !== null) isId = true
	let id = `schoolId=${school_id}`

	try {
		const res = await API.get(`/conversation/get-messages?conversationId=${conversationId}&page=${page}${isId ? '&' + id : ''}`)
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка получения сообщений',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return { messages: res.data.data }
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка получения сообщений',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function getConversations(school_id?: any, page?: number) {
	let search: any = []
	search['query'] = contactStore.search
	search['socials'] = Object.keys(contactStore.socials).filter((key: string) => contactStore.socials[key])
	let params = {} // d
	params['search'] = search
	params['page'] = page
	school_id ? params['schoolId'] = school_id : null
	try {
		const res = await API.get(`/conversation/get-conversations`, {
			params,
			paramsSerializer: params_2 => {
				return qs.stringify(params_2)
			}
		})
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка получения контактов',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return { data: res.data.data }
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка получения контактов',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function sendMsgFile(formData: any) {
	try {
		return API.post(`/conversation/send-message`, formData)
			.then((res: any) => {
				if (res.data.error) {
					notification.error({
						message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка отправки медиаконтента',
						description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
						placement: 'bottomRight',
						bottom: 50,
						duration: 3,
					});
				}

				return { menu: res.data.data }
			})
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка отправки медиаконтента',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
	let body = { conversationSourceAccountId, conversationId, schoolId, message }
	try {
		const res = await API.post(`/conversation/send-message`, body)
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка отправки сообщения',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return { menu: res.data.data }
	} catch (error) {

		notification.error({
			message: error ? error : 'Ошибка отправки сообщения',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function getUserData() {
	try {
		let res = await API.get('/account/get-account')
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка получения аккаунта',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return res
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка получения аккаунта',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function isLogged() {
	try {
		let res = await AUTH.get(`/account/is-logged`)
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка isLogged',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return res
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка получения аккаунта',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function setSession(sessionId: any) {
	try {
		const formData = new FormData()
		formData.append('encrypted_session_data', sessionId)
		let res = await AUTH.post(`/account/set-session`, formData)

		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка setSession',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}

		return res
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка setSession',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
}

async function getSchools() {
	try {
		let res = await API.get('/account/get-schools')
		if (res.data.error) {
			notification.error({
				message: res.data.data.error_message ? res.data.data.error_message : 'Ошибка получения школ',
				description: res.data.data.error_data.error_message ? res.data.data.error_data.error_message : '',
				placement: 'bottomRight',
				bottom: 50,
				duration: 3,
			});
		}
		return res
	} catch (error) {
		notification.error({
			message: error ? error : 'Ошибка получения школ',
			placement: 'bottomRight',
			bottom: 50,
			duration: 3,
		});
	}
	return null
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
