import { action, observable } from 'mobx'
import { isLogged, setSession, getUserData } from '@actions'
import IAuthStore from '@stores/interface/app/IAuthStore'
import CONFIG from "../../config"

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
		this.token = token
	}

	@action
	async login() {
		if (!this.isFrame) {
			const currentUrl = new URL(location.href)
			let encryptedSessionData: any
			const loggedData = await isLogged()

			if (currentUrl.search.includes('encrypted_session_data')) {
				encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data')
				if (encryptedSessionData) {
					const setSessionData = await setSession(encryptedSessionData)

					this.setToken(setSessionData.token)
				}

				currentUrl.searchParams.delete('encrypted_session_data')
				currentUrl.searchParams.delete('pid')

				history.replaceState(history.state, null, currentUrl.href)
			}

			if (loggedData.success) {
				this.setToken(loggedData.token)

				await getUserData()
			} else {
				if (!encryptedSessionData) {
					window.location.href = `${ CONFIG.BASE_AUTH_URL }/?redirect_url=${ window.location.href }`
				}
			}
		}
	}

	@action
	async initialize(): Promise<boolean> {
		const currentUrl = new URL(location.href)

		console.log('first', this.token)

		if (currentUrl.search.includes('encrypted_data')) {
			this.isFrame = true

			let encrypted_data = currentUrl.searchParams.get('encrypted_data')
			let decrypted_data = atob(encrypted_data).split('_')

			this.timestamp = decrypted_data[0]
			this.userId = decrypted_data[1]
			this.token = decrypted_data[2]
		}

		await this.login()

		console.log('second', this.token)

		return true
	}
}

export const authStore = new AuthStore()
