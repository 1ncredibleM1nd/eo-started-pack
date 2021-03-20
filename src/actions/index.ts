import { API, AUTH } from './axios'
import { contactStore } from '@stores/implementation'
import qs from 'qs'
import { notification } from 'antd'
// @ts-ignore
import { NotificationSettings } from '../Config/Config'

async function getConversations(school_id?: any, page?: number) {
	let search: any = {
		query: contactStore.search,
		source: Object.keys(contactStore.source).filter((key: string) => contactStore.source[key])
	}

	let params: any = {
		search,
		page
	}

	if (!!school_id) {
		params.schoolId = school_id
	}

	try {
		const response = await API.get(`/conversation/get-conversations`, {
			params,
			paramsSerializer: paramsObject => {
				return qs.stringify(paramsObject)
			}
		})

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка получения контактов'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return { data: response.data.data }
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка получения контактов'
		}, NotificationSettings))

		return { data: [] }
	}
}

async function getMessages(conversationId: string, page: number, school_id: string) {
	const params = new URLSearchParams()

	params.set('page', page.toString())
	params.set('conversationId', conversationId)

	if (!!school_id) {
		params.set('schoolId', school_id)
	}

	try {
		const response = await API.get(`/conversation/get-messages?${params}`)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка получения сообщений'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return { messages: response.data.data }
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка получения сообщений'
		}, NotificationSettings))

		return { messages: [] }
	}
}

async function sendMsgFile(formData: any) {
	try {
		const response = await API.post(`/conversation/send-message`, formData)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка отправки медиаконтента'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return { menu: response.data.data }
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка отправки медиаконтента'
		}, NotificationSettings))

		return { menu: false }
	}
}

async function sendMsg(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string) {
	let body = {
		conversationSourceAccountId,
		conversationId,
		schoolId,
		message
	}

	console.log('send message 2')

	try {
		const response = await API.post(`/conversation/send-message`, body)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка отправки сообщения'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return { menu: response.data.data }
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка отправки сообщения'
		}, NotificationSettings))

		return { menu: false }
	}
}

async function getUserData() {
	try {
		let response = await API.get('/account/get-account')

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка получения аккаунта'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return response
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка получения аккаунта'
		}, NotificationSettings))

		return null
	}
}

async function isLogged() {
	try {
		let response = await AUTH.get(`/account/is-logged`)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка проверки авторизации'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return response
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка проверки авторизации'
		}, NotificationSettings))

		return null
	}
}

async function setSession(sessionId: any) {
	try {
		const formData = new FormData()

		formData.append('encrypted_session_data', sessionId)

		let response = await AUTH.post(`/account/set-session`, formData)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка установки сессии'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return response
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка установки сессии'
		}, NotificationSettings))

		return null
	}
}

async function getSchools() {
	try {
		let response = await API.get('/account/get-schools')

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка получения школ'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(Object.assign({}, error, NotificationSettings))
		}

		return response
	} catch (error) {
		notification.error(Object.assign({}, {
			message: error.toString() ?? 'Ошибка получения школ'
		}, NotificationSettings))

		return null
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
