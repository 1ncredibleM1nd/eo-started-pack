import { action, observable } from 'mobx'
import { isLogged, setSession } from '@actions'
import IAuthStore from '@stores/interface/app/IAuthStore'
import CONFIG from "../../config"
import { userStore } from "@stores/implementation/UserStore";

export class AuthStore implements IAuthStore {
	checkLogin: () => void
	@observable loading: boolean = false
	@observable isFrame: boolean = false
	@observable token: string
	@observable userId: string
	@observable timestamp: string

	@action
	setLoader(loading: boolean) {
		this.loading = loading
	}

	@action
	setToken(token: string) {
		localStorage.setItem('token', token)
	}

	@action
	getToken() {
		return localStorage.getItem('token')
	}

	@action
	setTimestamp(timestamp: string) {
		this.timestamp = timestamp
	}

	@action
	getTimestamp() {
		return this.timestamp
	}

	@action
	setUserId(userId: string) {
		this.userId = userId
	}

	@action
	getUserId() {
		return this.userId
	}

	@action
	checkIsFrame() {
		this.isFrame = window.self !== window.top
	}

	@action
	async login() {
		if (!this.isFrame) {
			const currentUrl = new URL(location.href)
			let encryptedSessionData: any

			if (currentUrl.searchParams.has('encrypted_session_data')) {
				encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data')
				const setSessionData = await setSession(encryptedSessionData)

				this.setToken(setSessionData.token)

				currentUrl.searchParams.delete('encrypted_session_data')
				currentUrl.searchParams.delete('pid')

				history.replaceState(history.state, null, currentUrl.href)
			} else {
				const loggedData = await isLogged()

				if (loggedData.success) {
					this.setToken(loggedData.token)

					await userStore.initHero()
				} else {
					window.location.href = `${ CONFIG.BASE_AUTH_URL }/?redirect_url=${ window.location.href }`
				}
			}
		}
	}

	@action
	async initialize(): Promise<boolean> {
		const currentUrl = new URL(location.href)

		this.checkIsFrame()

		if (this.isFrame) {
			let encrypted_data = currentUrl.searchParams.get('encrypted_data')
			let decrypted_data = atob(encrypted_data).split('_')

			this.setTimestamp(decrypted_data[0])
			this.setUserId(decrypted_data[1])
			this.setToken(decrypted_data[2])
		}

		await this.login()

		return true
	}
}

export const authStore = new AuthStore()
