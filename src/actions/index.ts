import { API, AUTH } from './axios'
import {chatStore, contactStore} from '@stores/implementation'
import qs from 'qs'
import { notification } from 'antd'

async function getConversations(school_id?: any, page?: number) {
	let search: any = {
		query: contactStore.search,
		sources: Object.keys(contactStore.sources).filter((key: string) => contactStore.sources[key])
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

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка получения контактов'
		})

		return []
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
		const response = await API.get(`/conversation/get-messages?${ params }`)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка получения сообщений'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка получения сообщений'
		})

		return []
	}
}

async function sendMessage(conversationId: string, message: string, conversationSourceAccountId: any, schoolId: string, files: any) {
	const formData = new FormData()

	for (let i = 0; i < files.length; i++) {
		formData.append(`files[]`, files[i], files[i].name)
	}

	formData.append('message', message)
	formData.append('conversationSourceAccountId', conversationSourceAccountId)

	if (schoolId) {
		formData.append('schoolId', schoolId)
	}

	formData.append('conversationId', chatStore.activeChat.id)

	try {
		const response = await API.post(`/conversation/send-message`, formData)

		if (response.data.error !== 0) {
			const error: any = {
				message: response.data.data.error_message ?? 'Ошибка отправки сообщения'
			}

			if (!!response.data.data.error_data) {
				error.description = Object.values(response.data.data.error_data)
			}

			notification.error(error)
		}
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка отправки сообщения'
		})
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

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка получения аккаунта'
		})

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

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка проверки авторизации'
		})

		return {
			success: false
		}
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

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка установки сессии'
		})

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

			notification.error(error)
		}

		return response.data.data
	} catch (error) {
		notification.error({
			message: error.toString() ?? 'Ошибка получения школ'
		})

		return {}
	}
}

export {
	sendMessage,
	getConversations,
	getMessages,
	isLogged,
	setSession,
	getUserData,
	getSchools
}
